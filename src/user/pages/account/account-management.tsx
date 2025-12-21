import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MainLayout } from "@/user/layouts/main-layout";
import { Typography } from "@/components/ui/typography";
import { ProfileSection } from "@/user/features/user/profile-section";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LogOut } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LoadingModal } from "@/user/components/overlays/loading-modal";
import { getAddressAction, logoutAction } from "@/actions/profile";
import { useUserStore } from "@/user/stores/signup-store";
import { getErrorMessage } from "@/lib/utils/auth";
import { toast } from "sonner";
import { ConfirmAlertDialog } from "@/user/components/overlays/confirm-dialog";
import type { Address, Profile } from "@/user/types/profile";
import { Loading } from "@/user/components/ui/loading";

export const AccountManagement = () => {
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();
  const { clearUser } = useUserStore();

  const [isLogoutPending, setIsLogOutPending] = useState<boolean>(false);
  const [confirmLogOutOpen, setConfirmLogOutOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setIsLogOutPending(true);
      const res = await logoutAction();
      if (!res.success) {
        throw new Error(res.message);
      }
      localStorage.removeItem("access_token");
      clearUser();
      window.location.href = "/account/login";
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLogOutPending(false);
    }
  };

  const fetchAddress = useCallback(async () => {
    setIsPending(true);
    try {
      const response = await getAddressAction();
      setProfile(response.data.result);
      if (response.data.result.addresses.length > 0) {
        const defaultAddress = response.data.result.addresses.find(
          (item: Address) => item.isDefaultAddress
        );
        if (defaultAddress.length !== 0) {
          setDefaultAddress(defaultAddress);
        }
      }
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
        <div className="min-h-0 flex flex-col items-center justify-center overflow-auto pb-20">
          <Typography className="text-primary text-2xl font-extrabold py-10">
            Account
          </Typography>
          <Button
            variant="outline"
            className="mb-5 cursor-pointer"
            onClick={() => setConfirmLogOutOpen(true)}
          >
            LogOut <LogOut />
          </Button>
          {isPending ? (
            <Loading />
          ) : (
            <Card className="w-full max-w-[60%] rounded-2xl px-8">
              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <p className="text-2xl font-medium ">
                    Member registration information
                  </p>
                  <div className="h-px w-full bg-black mt-1" />
                  <div className="space-y-4 pt-5">
                    <ProfileSection
                      title="Name"
                      value={profile?.fullName ?? "--"}
                    />
                    <ProfileSection
                      title="Email address"
                      value={profile?.email ?? "--"}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-2xl font-medium ">
                    Default delivery destination
                  </p>
                  <div className="h-px w-full bg-black mt-1" />
                  <div className="space-y-4 pt-5">
                    {defaultAddress && (
                      <>
                        <ProfileSection
                          className="flex-row gap-3 flex "
                          title="Address :"
                          value={`${defaultAddress.locationDetail} - ${defaultAddress.province} - ${defaultAddress.city}`}
                        />
                        <ProfileSection
                          className="flex-row gap-3 flex "
                          title="Telephone :"
                          value={defaultAddress.phoneNumber}
                        />
                        <ProfileSection
                          className="flex-row gap-3 flex "
                          title="FullName : "
                          value={defaultAddress.recipientName}
                        />
                      </>
                    )}
                    {profile?.addresses.length === 0 ? (
                      <>
                        <p className="text-2xl ">
                          Delivery destination information is not registered.
                        </p>
                        <Button
                          onClick={() => navigate("/account/addresses")}
                          className="flex items-center rounded-full !px-10 h-11 text-base cursor-pointer group"
                        >
                          Register your address
                          <ArrowRight className="size-4 group-hover:translate-x-1.5 transform transition-all" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => navigate("/account/addresses")}
                        className="h-11 flex items-center rounded-full !px-10 py-5 text-base cursor-pointer group"
                      >
                        Fix and add address
                        <ArrowRight className="size-4 group-hover:translate-x-1.5 transform transition-all" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-2xl font-medium ">Order history</p>
                  <div className="h-px w-full bg-black mt-1" />
                  <div className="space-y-4 pt-5">
                    <p className="text-2xl ">
                      You haven't placed any orders yet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </MainLayout>
      {isLogoutPending && (
        <LoadingModal open={true} aria-describedby={undefined} />
      )}
      <ConfirmAlertDialog
        open={confirmLogOutOpen}
        onOpenChange={setConfirmLogOutOpen}
        isLoading={isLogoutPending}
        onConfirm={handleLogout}
        title="Log out of your account?"
        description="Are you sure you want to log out?"
        confirmLabel="Accept"
      />
    </>
  );
};
