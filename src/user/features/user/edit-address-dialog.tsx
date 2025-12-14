import { EditDialog } from "@/components/ui/edit-dialog";
import { getErrorMessage } from "@/lib/utils/auth";
import { addressSchema } from "@/user/schemas/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AddressForm } from "./address-form";
import { type Address } from "./address-item";
import { updateAddressAction } from "@/actions/profile";

interface UpdateAddressDialogProps {
  address: Address;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const EditAddressDialog = ({
  address,
  open,
  onOpenChange,
  onSuccess,
}: UpdateAddressDialogProps) => {
  const defaultValues = useMemo(() => {
    return {
      city: address.city,
      locationDetail: address.locationDetail,
      phoneNumber: address.phoneNumber,
      recipientName: address.recipientName,
      isDefaultAddress: address.isDefaultAddress,
      country: address.country,
      province: address.province,
    };
  }, [address]);

  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsPending(true);

      form.handleSubmit(async (formData) => {
        try {
          const res = await updateAddressAction(formData, address.id);
          if (!res.success) {
            throw new Error(res.message);
          }
          onOpenChange(false);
          toast.success("Edit Address Successfully!");
          onSuccess?.();
        } catch (err) {
          toast.error(getErrorMessage(err));
        } finally {
          setIsPending(false);
        }
      })(event);
    },
    [form, address]
  );

  return (
    <EditDialog
      open={open}
      onOpen={onOpenChange}
      form={form}
      onSubmit={handleSubmit}
      title="Edit Address"
      disabled={isPending}
    >
      <AddressForm form={form} isPending={isPending} />
    </EditDialog>
  );
};
