import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "@/user/schemas/auth";

import { Button } from "@/components/ui/button";

import { MainLayout } from "@/user/layouts/main-layout";
import { Typography } from "@/components/ui/typography";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormInputField } from "@/components/ui/form-input";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getErrorMessage } from "@/lib/utils/auth";
import { resetPasswordAction } from "@/actions/auth-v1";

export const ResetPasswordPage = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
    mode: "onChange",
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      form.handleSubmit(async (formData) => {
        try {
          setIsPending(true);
          const res = await resetPasswordAction(token, formData);

          console.log(res);

          if (!res.success) {
            throw new Error(res.message);
          }
          toast.success("Reset password successfully!");
        } catch (err) {
          toast.error(getErrorMessage(err));
        } finally {
          setIsPending(false);
        }
      })(event);
    },
    [form]
  );

  if (!token)
    return (
      <div className="relative flex h-full overflow-hidden">
        <div className="absolute top-6 left-6 z-10">
          <Typography className="font-inter text-primary text-2xl font-extrabold">
            Chiikawa
          </Typography>
        </div>
        <div className="flex h-full flex-1 items-center justify-center">
          <div className="max-w-md text-center">
            <Typography variant="h2" className="mb-4">
              Invalid Link
            </Typography>
            <p className="mb-6 text-gray-600">
              The password reset link is invalid or expired.
            </p>
            <Link
              to="/account/login"
              className="text-primary hover:text-primary/80 flex items-center justify-center gap-2 font-medium"
            >
              <ArrowLeft />
              Return to login screen
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <MainLayout>
      <div className="min-h-0 flex items-center justify-center overflow-auto py-20">
        <div className="relative flex h-full overflow-hidden">
          <div className="flex-1">
            <div className="flex h-full w-full flex-col items-center justify-center gap-10 overflow-auto">
              <div className="w-full max-w-md space-y-10">
                <div>
                  <Typography className="font-inter text-primary text-2xl font-extrabold">
                    Reset Password
                  </Typography>
                  <p className="text-muted-foreground mt-3 whitespace-nowrap">
                    Your new password must be different from your current
                    password.
                  </p>
                </div>
                <Form {...form}>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormInputField
                          type="password"
                          label="New password"
                          required
                          inputProps={{
                            placeholder: "Password",
                            autoComplete: "new-password",
                            disabled: isPending,
                            ...field,
                          }}
                          labelClassName="text-base"
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password_confirmation"
                      render={({ field }) => (
                        <FormInputField
                          type="password"
                          label="Password confirm"
                          required
                          inputProps={{
                            placeholder: "Password",
                            autoComplete: "new-password",
                            disabled: isPending,
                            ...field,
                          }}
                          labelClassName="text-base"
                        />
                      )}
                    />
                    <div className="space-y-3">
                      <Button
                        type="submit"
                        className="h-14 w-full rounded-xl"
                        disabled={isPending}
                      >
                        {isPending ? "Resetting..." : "Submit"}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-14 w-full rounded-xl font-medium"
                        onClick={() => navigate("/account/login")}
                        disabled={isPending}
                      >
                        <ArrowLeft className="size-5" />
                        Go to the login screen
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
