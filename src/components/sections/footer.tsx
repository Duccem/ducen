import logo from "@/assets/lumen-dark.png";
import { Button } from "@/lib/shadcn/components/ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex bg-white rounded-lg flex-col mt-[120px] py-4 px-4 md:px-[80px] gap-10">
      <p className="text-lg">Contact Us</p>
      <div className="flex flex-col md:flex-row w-full items-center">
        <div className="w-full md:w-1/2 space-y-5">
          <p className="text-5xl md:text-7xl inline-block">
            Lets discuss your vision with us
          </p>{" "}
          <div className="group hover:-translate-x-1 hover:-translate-y-1 transition-all inline-block">
            <Button
              className="bg-neutral-900 text-2xl p-5 h-16 font-extralight [&_svg]:size-8 group-hover:bg-neutral-700  rounded-full"
              size={"lg"}
            >
              Book a 15min call
            </Button>
            <Button
              className="rounded-full h-16 w-16  bg-neutral-900  group-hover:bg-neutral-700"
              size={"icon"}
            >
              <Phone />
            </Button>
          </div>
        </div>
        <div className=" w-full md:w-1/2 flex items-center md:items-end justify-start flex-col mt-10">
          <p className="text-2xl font-medium">+58 (412) 180-2961</p>
          <p className="text-2xl font-medium">contact@lumencodedev.com</p>
        </div>
      </div>
      <hr className="border-black" />
      <div className="w-full flex-col md:flex-row flex justify-between   items-center">
        <Link href={"/"} className="flex justify-start items-center gap-3">
          <img src={logo.src} alt="" className="h-[50px]" />
          <p className="text-3xl font-semibold">Lumen</p>
        </Link>
        <div className="flex justify-between items-center gap-4   p-3 rounded-lg">
          <Link
            href={"/services"}
            className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300 hover:text-gray-200 text-sm md:text-lg"
          >
            About us
          </Link>
          <Link
            href={"/services"}
            className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300 hover:text-gray-200 text-sm md:text-lg"
          >
            Services
          </Link>
          <Link
            href={"/services"}
            className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300 hover:text-gray-200 text-sm md:text-lg"
          >
            Process
          </Link>
          <Link
            href={"/services"}
            className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300 hover:text-gray-200 text-sm md:text-lg"
          >
            Terms & Conditions
          </Link>
        </div>
        <div>
          <Link href={"http://cal.com/jose-manuel-veliz/15min"}>
            @lumen 2025. All rights reserved
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

