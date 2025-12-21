import { getCart } from "@/actions/cart";
import { checkoutAction, payAction } from "@/actions/payment";
import { getAddressAction } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/lib/utils/auth";
import { cn, formatPrice } from "@/lib/utils/form-utils";
import { Loading } from "@/user/components/ui/loading";
import { useCartStore } from "@/user/stores/cart-store";
import type { Address } from "@/user/types/profile";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const PaymentPage = () => {
  const ids = useCartStore((s) => s.ids);

  const [orderId, setOrderId] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const [isCheckoutPending, setIsCheckoutPending] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);

  const [shipAddress, setShipAddress] = useState<Address | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([]);
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

  const fetchCart = useCallback(async () => {
    setIsPending(true);

    try {
      const [cartRes, addressRes] = await Promise.all([
        getCart(),
        getAddressAction(),
      ]);

      const defaultAddress = addressRes.data.result.addresses.find(
        (item: Address) => item.isDefaultAddress
      );

      if (defaultAddress) {
        setShipAddress(defaultAddress);
      }

      setRows(cartRes.data.cartItems);
      setAddresses(addressRes.data.result.addresses);
    } catch (err) {
      console.error(err);
      toast.error("Fail to get payment data!");
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleChange = (value: string) => {
    const selectedAddress = addresses.find((item) => item.id === Number(value));
    if (selectedAddress) {
      setShipAddress(selectedAddress);
    }
  };

  const purchaseItems = useMemo(() => {
    return rows.filter((item) => ids.includes(item.id));
  }, [rows, ids]);

  const paymentTotal = useMemo(() => {
    return purchaseItems.reduce((total, item) => {
      if (!item) return total;

      return total + item.price * item.quantity;
    }, 0);
  }, [purchaseItems]);

  const handleCheckout = async () => {
    setIsCheckoutPending(true);
    try {
      if (!shipAddress) {
        return;
      }
      const response = await checkoutAction({
        items: purchaseItems,
        address: shipAddress,
      });
      if (response.data.orderId) setOrderId(response.data.orderId);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsCheckoutPending(false);
    }
  };

  const handlePayment = async () => {
    setIsPaymentPending(true);
    try {
      if (!orderId) {
        return;
      }
      const response = await payAction(orderId);

      const { checkoutUrl } = response.data;

      window.location.replace(checkoutUrl);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsPaymentPending(false);
    }
  };

  console.log(rows);
  console.log(ids);

  return (
    <div className="h-screen w-full overflow-auto bg-white">
      <div className="h-[125px] w-[1060px] mx-auto flex items-center justify-start ">
        <div className="w-80 h-20 flex items-end">
          <img src="https://cdn.shopify.com/s/files/1/0626/7142/1681/files/logo_chiikawamarket_x320.png?v=1659340705" />
        </div>
      </div>
      <div className="border"></div>
      {isPending ? (
        <Loading />
      ) : (
        <div className="flex items-start">
          <div className="basis-1/2 flex justify-end border-r pr-10">
            <div className="w-[580px]">
              <p className="my-2">Ship to</p>
              {addresses.length === 0 ? (
                <Link to={"/account/addresses"}>
                  You did not have registered address
                </Link>
              ) : (
                <div className="max-h-[500px]">
                  <div className="flex flex-col">
                    <RadioGroup
                      value={String(shipAddress?.id)}
                      onValueChange={(value) => handleChange(value)}
                      className={cn("space-y-4")}
                    >
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={cn(
                            "flex items-center space-x-2 p-4 rounded-lg bg-primary/10 gap-4",
                            address.id === shipAddress?.id &&
                              "border-primary border"
                          )}
                        >
                          <RadioGroupItem
                            value={String(address.id)}
                            id={String(address.id)}
                            className="h-5 w-5"
                            iconClassName="size-3"
                          />
                          <div className="flex flex-1 flex-col gap-1">
                            <Label
                              htmlFor={String(address.id)}
                              className="text-base leading-4"
                            >
                              {address.recipientName}
                            </Label>
                            <p className="leading-5">
                              {address.locationDetail}-{address.province}-
                              {address.country}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="basis-1/2 flex justify-start">
            <div className="w-[480px] flex flex-col p-10">
              <div className="flex flex-col overflow-auto py-4 h-[300px] border-b gap-2">
                {ids.map((id) => {
                  const matchedItem = rows.find((row) => row.id === id);

                  return (
                    <div className="flex items-start gap-5" key={id}>
                      <div className="size-16 flex-shrink-0  relative">
                        <div className="w-full h-full overflow-hidden border rounded-lg">
                          <img
                            src={matchedItem?.image}
                            className="w-full h-full object-covef"
                          />
                        </div>
                        <p className="absolute size-6 -top-2 -right-2 rounded-xl bg-black text-white text-center">
                          {matchedItem?.quantity}
                        </p>
                      </div>
                      <p className="line-clamp-3 text-normal">
                        {matchedItem?.name}
                      </p>
                      <p>¥{formatPrice(matchedItem?.price)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="py-5">
                <div className="flex items-center justify-between">
                  <p>Subtotal · {ids.length} items</p>
                  <p> ¥{formatPrice(paymentTotal)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="uppercase text-base font-medium">Total</p>
                  <p className="uppercase text-base font-medium">
                    {" "}
                    ¥{formatPrice(paymentTotal)}
                  </p>
                </div>
              </div>
              <Button
                className="rounded-none py-3 pr-0"
                disabled={isCheckoutPending}
                onClick={handleCheckout}
              >
                {isCheckoutPending ? "Checkout..." : "Checkout"}
              </Button>
              {orderId && (
                <div className="grid grid-cols-2 gap-3 mt-5 w-full ">
                  <Button
                    className="rounded-none "
                    disabled={isPaymentPending}
                    onClick={() => handlePayment()}
                  >
                    {isPaymentPending && (
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                    )}
                    Pay now
                  </Button>
                  <Button variant={"outline"} className="rounded-none ">
                    Pay later
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
