import { Button } from "@/lib/shadcn/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row w-full  justify-around md:gap-[150px] items-center px-4 md:px-[80px]  ">
      <div className="flex flex-col justify-around items-start w-full md:w-1/3 h-full py-24">
        <p className="text-2xl font-semibold  text-white">About us</p>
        <p className="text-lg text-neutral-400">
          At Lumen, we combine the power of code and the creativity of digital
          marketing to drive your business into the future. We are passionate
          about technology and specialize in developing tailored digital
          solutions, from web and mobile applications to marketing strategies
          that connect with your audience.
        </p>
      </div>
      <div className="flex flex-col w-full md:w-1/3 gap-5">
        <p className="text-4xl md:text-6xl text-white font-light   text-balance">
          We turn <span className="font-black">ideas</span> into digital
          <span className="font-black">experiences</span> that inspire and make
          an <span className="font-black">impact</span>.
        </p>
        <div className="mt-5 relative flex items-center hover:-translate-x-1 hover:-translate-y-1 transition-all">
          <Button
            className="bg-white rounded-full  hover:bg-black/50 text-black hover:bg-white"
            size={"lg"}
          >
            Contact with us
          </Button>
          <Button
            className="rounded-full  bg-white text-black hover:bg-white"
            size={"icon"}
          >
            <ArrowUpRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

