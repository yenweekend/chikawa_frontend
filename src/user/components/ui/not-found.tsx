import { MainLayout } from "@/user/layouts/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const NotFound = () => {
  return (
    <MainLayout>
      <Card className="max-w-6xl mx-auto my-20 flex items-center justify-center gap-10">
        <h1 className="title">404</h1>
        <p>Page not found</p>
        <Button variant="outline" type="button" className="h-14">
          <a href="/collections/all" className="button">
            Continue shopping
          </a>
        </Button>
      </Card>
    </MainLayout>
  );
};
