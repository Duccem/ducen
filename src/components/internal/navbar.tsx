import logo from "@/assets/lumen-dark.png";
import { Button } from "@/lib/shadcn/components/ui/button";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/lib/shadcn/components/ui/sidebar";
import { Phone } from "lucide-react";
import Link from "next/link";
import SidebarApp from "./sidebar-app";
const Navbar = () => {
  return (
    <div className="max-h-[100px] absolute w-full z-50">
      <div className="w-full hidden md:flex justify-between   items-center top-0 left-0 right-0 px-[100px] py-6 z-10">
        <Link href={"/"} className="flex justify-start items-center gap-3">
          <img src={logo.src} alt="" className="h-[50px]" />
          <p className="text-white text-3xl font-semibold">Lumen</p>
        </Link>
        <div className="flex justify-between items-center gap-4 text-white bg-neutral-900 p-3 rounded-lg">
          <Link
            href={"/services"}
            className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300"
          >
            About us
          </Link>
          <Link
            href={"/services"}
            className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            href={"/services"}
            className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300"
          >
            Process
          </Link>
          <Link
            href={"/services"}
            className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300"
          >
            Pricing
          </Link>
        </div>
        <div>
          <Link href={"http://cal.com/jose-manuel-veliz/15min"}>
            <Button className="bg-neutral-900 hover:bg-neutral-700">
              <Phone />
              Book a call
            </Button>
          </Link>
        </div>
      </div>
      <div className="md:hidden  px-[30px] py-7 flex ">
        <SidebarProvider className="justify-between ">
          <SidebarApp></SidebarApp>
          <SidebarTrigger className="bg-neutral-900 size-10" />
          <img src={logo.src} alt="" className="size-10" />
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Navbar;

