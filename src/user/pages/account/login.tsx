import { useCallback } from "react";
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

export const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      form.handleSubmit((data) => {
        console.log(data);
      })(event);
    },
    [form]
  );

  return (
    <MainLayout>
      <div className="min-h-0 flex items-center justify-center overflow-auto py-20">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="max-w-2xl w-full ">
            <Card className="w-full max-w-2xl rounded-2xl px-8">
              <CardHeader>
                <CardTitle className="space-y-4">
                  <Typography variant={"h2"} className="text-center">
                    Login
                  </Typography>
                  <div className="flex items-center justify-center cursor-pointer">
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
                        // disabled: isPending,
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
                        // disabled: isPending,
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
