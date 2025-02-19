import logo from "@/assets/lumen-dark.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/lib/shadcn/components/ui/sidebar";
import Link from "next/link";

const SidebarApp = () => {
  return (
    <Sidebar className="bg-neutral-900 text-white">
      <SidebarContent className="bg-neutral-900 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/"} className="p-3 w-full">
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/destinations"} className="p-3 w-full">
                    <span>About us</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/gallery"} className="p-3 w-full">
                    <span>Services</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/gallery"} className="p-3 w-full">
                    <span>Process</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/gallery"} className="p-3 w-full">
                    <span>Pricing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-neutral-900 text-white">
        <div className="flex  items-center justify-center">
          <div className="h-10 w-10 overflow-hidden rounded-lg">
            <img src={logo.src} alt="" className="object-contain" />
          </div>
          <Link href="/" className="text-center p-3  text-xl font-medium">
            Lumen
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarApp;

