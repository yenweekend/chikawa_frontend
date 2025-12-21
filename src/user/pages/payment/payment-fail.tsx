import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const PaymentFailed = () => {
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
            <CardTitle>Payment Failed</CardTitle>
            <CardDescription>We couldn’t process your payment.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <XCircle className="h-16 w-16 text-red-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">
                  Your payment was not completed
                </h2>
                <p className="text-muted-foreground">
                  Please check your payment details or try again with a
                  different payment method.
                </p>
                <p className="text-sm text-muted-foreground">
                  No charges were made to your account.
                </p>
              </div>

              <div className="space-y-3">
                <Link to="/checkout">
                  <Button className="w-full">Try again</Button>
                </Link>

                <Link to="/cart">
                  <Button variant="outline" className="w-full">
                    Back to cart
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
