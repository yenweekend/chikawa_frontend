import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { formatPrice } from "@/lib/utils/form-utils";
import { Counter } from "@/user/components/ui/counter";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { ConfirmAlertDialog } from "@/user/components/overlays/confirm-dialog";
import { deleteCartItem } from "@/actions/cart";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/auth";

interface CartRowProps {
  item: {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  };
  selected: boolean;
  onSelectChange: (val: boolean, id: string) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
  disabled: boolean;
  onSuccess?: () => void;
}

export const CartRow = ({
  item,
  selected,
  onSelectChange,
  onQuantityChange,
  disabled,
  onSuccess,
}: CartRowProps) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity ?? 1);
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };
  const handleDeleteAddress = async () => {
    setIsPending(true);
    try {
      const res = await deleteCartItem(item.id);

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
      <div className="flex items-center py-8 border-y-2">
        <div className="w-20 flex items-center justify-center">
          <Checkbox
            checked={selected}
            onCheckedChange={(value) => onSelectChange(value === true, item.id)}
            className="size-5"
          />
        </div>
        <div className="flex-1 min-w-0 flex gap-5">
          <div className="size-42 overflow-hidden border">
            <img src={item.image} className="w-full h-full object-cover" />
          </div>
          <div className="line-clamp-3 pr-10">
            <p className="line-clamp-3 text-base">{item.name}</p>
            <Typography variant="medium-large" className="text-xl ">
              ¥{formatPrice(item.price)}
            </Typography>
          </div>
        </div>
        <div className="basis-1/5 uppercase flex items-center gap-10">
          <Counter
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={99}
            label=""
            className="items-start"
            disabled={disabled}
          />
          <button
            className="flex items-center justify-center size-5"
            onClick={() => setDeleteConfirmOpen(true)}
            disabled={isPending}
          >
            <Trash2 className="size-5" />
          </button>
        </div>
        <div className="basis-1/5 uppercase flex items-center justify-end text-xl">
          ¥{formatPrice(2000)}
        </div>
      </div>
      <ConfirmAlertDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        isLoading={isPending}
        onConfirm={handleDeleteAddress}
        title="Delete this product ?"
        description="This product will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete"
      />
    </>
  );
};
