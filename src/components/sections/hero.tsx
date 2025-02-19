import { Button } from "@/lib/shadcn/components/ui/button";
import { Mail, Phone } from "lucide-react";
import LinkedIn from "../icons/linkedin";
import WhatsAppIcon from "../icons/whatsapp";

const Hero = () => {
  return (
    <div className="w-full flex flex-col h-[calc(100vh-15px)] box-border relative bg-hero rounded-2xl pt-[100px] md:py-4 px-10 md:px-[80px] gap-4">
      <div className="flex h-full w-full flex-col md:flex-row">
        <div className="flex flex-col justify-center items-start lg:w-1/2 gap-4">
          <p className="text-3xl md:text-6xl font-semibold text-white text-center md:text-start">
            Lumen your development and design partner for early tech startup
          </p>
          <p className="md:text-xl font-semibold text-gray-300 w-full md:w-3/4 text-center md:text-start">
            Imagine and realize your digital product seamlessly. Beautiful,
            remarkable, consistent and scalable.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 w-full md:w-2/3 flex-wrap">
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              Web sites
            </div>
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              App móviles
            </div>
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              Landings
            </div>
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              Branding
            </div>
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              Logo design
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:justify-end md:items-end w-full lg:w-1/2 gap-4 h-full">
          <div className="flex flex-col md:flex-row justify-center items-center  md:justify-end md:items-end gap-4 h-full">
            <div className="group hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <Button
                className="bg-neutral-900 text-lg md:text-2xl p-5 md:p-5 h-16 font-extralight [&_svg]:size-8 group-hover:bg-neutral-700  rounded-full"
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
            <div className="flex justify-start items-center">
              <Button
                className="rounded-full h-16 w-16  bg-neutral-900  hover:bg-neutral-700"
                size={"icon"}
              >
                <WhatsAppIcon />
              </Button>
              <Button
                className="rounded-full h-16 w-16  bg-neutral-900  hover:bg-neutral-700"
                size={"icon"}
              >
                <LinkedIn />
              </Button>
              <Button
                className="rounded-full h-16 w-16  bg-neutral-900  hover:bg-neutral-700"
                size={"icon"}
              >
                <Mail />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

