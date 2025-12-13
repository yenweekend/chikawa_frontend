import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema } from "@/user/schemas/auth";

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
import { LineSignUpIcon } from "@/user/components/ui/common-icons";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/auth";
import { signUpCredential } from "@/actions/auth-v1";

export const SignUpPage = () => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      form.handleSubmit(async (formData) => {
        try {
          setIsPending(true);
          const res = await signUpCredential(formData);

          if (!res.success) {
            toast.error(res.message || "Registration failed");
            return;
          }

          toast.success(
            res.message ||
              "A confirmation email has been sent to your email address!"
          );
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
                    Create your account
                  </Typography>
                  <div className="flex items-center justify-center cursor-pointer">
                    <LineSignUpIcon />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormInputField
                      label="First name"
                      required
                      inputProps={{
                        placeholder: "Enter your first name",
                        disabled: isPending,
                        ...field,
                      }}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormInputField
                      label="Last name"
                      required
                      inputProps={{
                        placeholder: "Enter your last name",
                        disabled: isPending,
                        ...field,
                      }}
                    />
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormInputField
                      type="password"
                      label="Password"
                      required
                      inputProps={{
                        placeholder: "Enter password",
                        autoComplete: "current-password",
                        disabled: isPending,
                        ...field,
                      }}
                    />
                  )}
                />
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="h-10 px-20 py-5 rounded-full bg-blue-600 text-white mx-auto"
                  disabled={isPending}
                >
                  Create
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};
