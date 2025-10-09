import { Header } from "@/user/components/ui/header";
import { Footer } from "@/user/components/ui/footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-0 overflow-auto ">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
