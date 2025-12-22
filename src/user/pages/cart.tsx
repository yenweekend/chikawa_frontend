import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MainLayout } from "@/user/layouts/main-layout";
import { CartRow } from "../features/products/cart-row";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Typography } from "@/components/ui/typography";
import { cn, formatPrice } from "@/lib/utils/form-utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cart-store";
import { getCart, updateCart } from "@/actions/cart";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/auth";
import { Loading } from "../components/ui/loading";

export const CartPage = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<
    {
      id: string;
      image: string;
      name: string;
      description: string;
      price: number;
      quantity: number;
    }[]
  >([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isPendingUpdateCart, setIsPendingUpdateCart] =
    useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { setIds } = useCartStore((s) => s);

  const fetchCart = useCallback(async () => {
    setIsPending(true);
    try {
      const response = await getCart();

      setRows(response.data.cartItems);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsPending(false);
    }
  }, []);

  const handleSelectChange = (checked: boolean, id: string) => {
    setSelectedIds((prev) => {
      if (checked) {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      }

      return prev.filter((itemId) => itemId !== id);
    });
  };

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    setIsPendingUpdateCart(true);
    try {
      const response = await updateCart({
        id: id,
        quantity: newQuantity,
      });
      console.log(response);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsPendingUpdateCart(false);
    }
  };

  const hasSelected = selectedIds.length > 0;

  const totalPrice = useMemo(() => {
    const result = rows.filter((item) => selectedIds.includes(item.id));

    if (result.length > 0) {
      return result.reduce((init, value) => {
        return init + value.price * value.quantity;
      }, 0);
    }

    return 0;
  }, [selectedIds, rows]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <>
      <MainLayout>
        {isPending ? (
          <Loading />
        ) : (
          <div className="min-h-0 flex flex-col items-center justify-center overflow-auto py-20">
            <Card className="w-[90%] pb-10">
              <CardHeader className="uppercase text-center text-xl">
                your cart
              </CardHeader>
              <CardContent>
                <div className="flex items-center pb-5 border-b ">
                  <div className="w-20 flex items-center justify-center"></div>
                  <div className="flex-1 min-w-0 uppercase">product</div>
                  <div className="basis-1/5 uppercase">quantity</div>
                  <div className="basis-1/5 uppercase flex items-center justify-end">
                    total
                  </div>
                </div>
                {rows.map((row) => (
                  <CartRow
                    key={row.id}
                    item={row}
                    selected={selectedIds.includes(row.id)}
                    onSelectChange={handleSelectChange}
                    onQuantityChange={handleQuantityChange}
                    disabled={isPendingUpdateCart}
                    onSuccess={() => fetchCart()}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </MainLayout>
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 h-30 bg-white border-t-2 shadow-2xl flex items-center",
          "transform transition-transform duration-300 ease-in-out",
          hasSelected ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="w-[80%] mx-auto flex items-center justify-between">
          <div className="">
            <p>Estimated total</p>
            <Typography variant="medium-large" className="text-xl ">
              ¥{formatPrice(totalPrice)}
            </Typography>
          </div>
          .
          <Button
            className="rounded-none"
            onClick={() => {
              if (hasSelected) {
                setIds(selectedIds);
                navigate("/payment");
              }
              return;
            }}
            disabled={!hasSelected}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};
