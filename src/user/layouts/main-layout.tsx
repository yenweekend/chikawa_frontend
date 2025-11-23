import { cn } from "@/lib/utils";

import { Header } from "@/user/components/ui/header";
import { Footer } from "@/user/components/ui/footer";
import { Chatbox } from "@/user/layouts/chatbox";

interface MainLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <>
      <div className="min-h-0 overflow-auto flex flex-col h-dvh no-scrollbar">
        <Header />
        <div className={cn("flex-1", className)}>{children}</div>
        <Footer />
      </div>
      <Chatbox />
    </>
  );
};
