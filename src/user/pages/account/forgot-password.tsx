import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordSchema } from "@/user/schemas/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MainLayout } from "@/user/layouts/main-layout";
import { Typography } from "@/components/ui/typography";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormInputField } from "@/components/ui/form-input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getErrorMessage } from "@/lib/utils/auth";
import { sendMailForgotPasswordAction } from "@/actions/auth-v1";

export const ForgotPasswordPage = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      form.handleSubmit(async (formData) => {
        setIsPending(true);
        try {
          const res = await sendMailForgotPasswordAction({
            email: formData.email,
          });

          console.log(res);

          if (!res.success) {
            throw new Error(res.message);
          }
          toast.success("Please go to your gmail to reset password!");
        } catch (err) {
          toast.error(getErrorMessage(err));
        } finally {
          setIsPending(false);
        }
      })(event);
    },
    [form]
  );

  return (
    <MainLayout>
      <div className="min-h-0 flex items-center justify-center overflow-auto py-20">
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl w-full "
            noValidate
          >
            <Card className="w-full max-w-2xl rounded-2xl px-8">
              <CardHeader>
                <CardTitle className="space-y-4">
                  <Typography
                    variant={"h2"}
                    className="text-center font-medium"
                  >
                    Enter your registered email
                  </Typography>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormInputField
                      label="Email"
                      required
                      inputProps={{
                        placeholder: "name@example.com",
                        autoComplete: "email",
                        disabled: isPending,
                        ...field,
                      }}
                    />
                  )}
                />
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="h-14 w-full rounded-xl"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Submit"}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 w-full rounded-xl font-medium"
                    onClick={() => navigate("/account/login")}
                    disabled={isPending}
                  >
                    <ArrowLeft className="size-5" />
                    Go to login screen
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};
