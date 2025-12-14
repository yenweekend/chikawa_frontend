import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MainLayout } from "@/user/layouts/main-layout";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { NewAddressDialog } from "@/user/features/user/new-address-dialog";

import { AddressItem } from "@/user/features/user/address-item";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getAddressAction } from "@/actions/profile";
import { getErrorMessage } from "@/lib/utils/auth";
import { Loading } from "@/user/components/ui/loading";
import type { Address } from "@/user/types/profile";
import { Link } from "react-router-dom";

export const AddressManagement = () => {
  const [open, onOpenChange] = useState(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const fetchAddress = useCallback(async () => {
    setIsPending(true);
    try {
      const response = await getAddressAction();
      setAddresses(response.data.result.addresses);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  return (
    <>
      <MainLayout>
        {isPending ? (
          <Loading />
        ) : (
          <>
            <div className="min-h-0 flex flex-col items-center justify-center overflow-auto pb-20">
              <Typography className="text-primary text-2xl font-extrabold py-10">
                Addresses
              </Typography>
              <Link className="mb-4 !underline" to={"/account/profile"}>
                Back to Profile
              </Link>
              <Card className="w-full max-w-[60%] rounded-2xl px-8">
                <CardContent className="flex flex-col gap-3 pb-10">
                  <Button
                    className="h-11 flex items-center rounded-full !px-5 py-5 text-base cursor-pointer group w-auto mx-auto"
                    onClick={() => onOpenChange(true)}
                  >
                    Add a new address
                    <Plus className="size-4 group-hover:translate-x-1.5 transform transition-all" />
                  </Button>
                  <div className="h-px w-full bg-[#ccc] my-10" />
                  <div className="flex flex-col gap-10">
                    {addresses.map((item) => (
                      <>
                        <AddressItem
                          key={item.id}
                          address={item}
                          onSuccess={() => fetchAddress()}
                        />
                        <div className="h-px w-full bg-[#ccc] my-10" />
                      </>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </MainLayout>
      <NewAddressDialog
        open={open}
        onOpenChange={onOpenChange}
        onSuccess={() => fetchAddress()}
      />
    </>
  );
};
