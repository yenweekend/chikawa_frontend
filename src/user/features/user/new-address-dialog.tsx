import { EditDialog } from "@/components/ui/edit-dialog";
import { getErrorMessage } from "@/lib/utils/auth";
import { addressSchema, type AddressFormData } from "@/user/schemas/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AddressForm } from "./address-form";
import { addAddressAction } from "@/actions/profile";

interface NewAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const DEFAULT_ADD_MEMBER_VALUES: AddressFormData = {
  city: "",
  locationDetail: "",
  phoneNumber: "",
  recipientName: "",
  isDefaultAddress: false,
  country: "",
  province: "",
};

export const NewAddressDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: NewAddressDialogProps) => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: DEFAULT_ADD_MEMBER_VALUES,
    mode: "onChange",
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsPending(true);

      form.handleSubmit(async (formData) => {
        try {
          const res = await addAddressAction(formData);
          if (!res.success) {
            throw new Error(res.message);
          }
          onSuccess?.();

          toast.success("Add Address successful!");
        } catch (err) {
          toast.error(getErrorMessage(err));
        } finally {
          onOpenChange(false);
          setIsPending(false);
        }
      })(event);
    },
    [form]
  );

  return (
    <EditDialog
      open={open}
      onOpen={onOpenChange}
      form={form}
      onSubmit={handleSubmit}
      title="Add a new address"
      disabled={isPending}
    >
      <AddressForm form={form} isPending={isPending} />
    </EditDialog>
  );
};
