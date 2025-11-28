import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/user/schemas/auth";

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
import { LineIcon } from "@/user/components/ui/common-icons";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/auth";
import { useDispatch } from "react-redux";
import { set } from "@/stores/slices/auth-slice";

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [isPending, setIsPending] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const LINE_CHANNEL_ID = "2008514826";
  const REDIRECT_URI = "http://localhost:5173/line/callback";
  const STATE = "login";

  const lineUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CHANNEL_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&state=${STATE}&scope=profile%20openid%20email`;

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsPending(true);

      form.handleSubmit(async (formData) => {
        const { email, password } = formData;
        try {
          const res = await fetch(
            "https://fearsome-ollie-correspondently.ngrok-free.dev/api/v1/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // "ngrok-skip-browser-warning": "true",
              },
              body: JSON.stringify({
                email,
                password,
              }),
              credentials: "include",
            }
          );

          const token = res.headers.get("Authorization");
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Login failed");
          }

          console.log(token);
          console.log(data);

          if (data.result && token) {
            console.log(data);

            dispatch(
              set({
                ...data.result,
                isAuthenticated: true,
              })
            );
            window.location.href = "/";
          } else {
            throw new Error("Missing user or token in response");
          }
        } catch (err) {
          toast.error(getErrorMessage(err));
        } finally {
          setIsPending(false);
        }
      })(event);
    },
    [dispatch, form]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message");

    if (message) toast.success(message);
  }, []);

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
                    Login
                  </Typography>
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      window.open(lineUrl, "_blank");
                    }}
                  >
                    <LineIcon />
                  </div>
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
                  Sign in
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};
