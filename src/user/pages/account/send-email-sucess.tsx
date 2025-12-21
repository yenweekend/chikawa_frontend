import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const ResetPasswordRequestSuccess = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">Chiikawa shop</h1>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Request Sent Successfully</CardTitle>
            <CardDescription>Please check your email</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Password reset email sent
                </h2>
                <p className="text-muted-foreground">
                  We’ve sent a password reset link to your email address.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please check your inbox and follow the instructions to reset
                  your password. If you don’t see the email, please check your
                  spam folder.
                </p>
              </div>

              <div className="space-y-3">
                <Link to="/login">
                  <Button className="w-full">Back to login</Button>
                </Link>

                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Back to home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
