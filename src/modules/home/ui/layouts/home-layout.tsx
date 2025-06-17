import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "@/modules/home/ui/components/home-navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Homelayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <div>{children}</div>
      </div>
    </SidebarProvider>
  );
};
