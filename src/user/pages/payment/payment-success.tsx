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

export const PaymentSuccess = () => {
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
            <CardTitle>Payment Successful</CardTitle>
            <CardDescription>Thank you for your purchase!</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Your order has been confirmed
                </h2>
                <p className="text-muted-foreground">
                  We have successfully received your payment.
                </p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email with your order details has been sent.
                </p>
              </div>

              <div className="space-y-3">
                <Link to="/orders">
                  <Button className="w-full">View my orders</Button>
                </Link>

                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Continue shopping
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
