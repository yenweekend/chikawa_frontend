import { OptionalBadge } from "@/components/ui/form-badge";
import { InfoDisplay } from "./info-display";
import { Button } from "@/components/ui/button";
import { EditAddressDialog } from "@/user/features/user/edit-address-dialog";
import { ConfirmAlertDialog } from "@/user/components/overlays/confirm-dialog";
import { useState } from "react";
import { deleteAddressAction } from "@/actions/profile";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/auth";
export type Address = {
  id: number;
  city: string;
  locationDetail: string;
  phoneNumber: string;
  recipientName: string;
  isDefaultAddress: boolean;
  country: string;
  province: string;
};

interface AddressItemProps {
  address: Address;
  onSuccess?: () => void;
}

export const AddressItem = ({ address, onSuccess }: AddressItemProps) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleDeleteAddress = async () => {
    setIsPending(true);
    try {
      const res = await deleteAddressAction(address.id);

      if (!res.success) {
        throw new Error(res.message);
      }

      toast.success("Delete successfully!");
      onSuccess?.();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {address.isDefaultAddress && (
          <OptionalBadge text="Default" className="text-xl px-5 font-normal" />
        )}
        <div className="space-y-1.5">
          <InfoDisplay
            value={address.recipientName}
            textClassName="text-base"
          />
          <InfoDisplay
            title={address.city}
            value={address.locationDetail}
            textClassName="text-base"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="h-11 flex items-center rounded-full !px-10 py-5 text-base cursor-pointer "
            disabled={isPending}
            onClick={() => setOpenEdit(true)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="h-11 flex items-center rounded-full !px-10 py-5 text-base cursor-pointer "
            disabled={address.isDefaultAddress || isPending}
            onClick={() => setDeleteConfirmOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>
      <ConfirmAlertDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        isLoading={isPending}
        onConfirm={handleDeleteAddress}
        title="Delete address ?"
        description="This address will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete"
      />
      <EditAddressDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        address={address}
        onSuccess={onSuccess}
      />
    </>
  );
};
