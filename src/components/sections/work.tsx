import { Button } from "@/lib/shadcn/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
const Work = () => {
  return (
    <div className="w-full min-h-[calc(100vh-30px)] md:px-[80px] py-[60px]">
      <p className="text-white text-xl">Work</p>
      <p className="text-6xl font-semibold text-white">Our recent projects</p>
      <div className="w-full grid grid-cols-1  md:grid-cols-2 gap-6 py-[20px]">
        <div className="bg-white flex flex-col p-2 rounded-xl gap-[30px] relative">
          <Link
            className="absolute right-4 top-4 bg-white rounded-full p-2 border"
            href={"https://www.4kadventuresandtours.com/"}
            target="_blank"
          >
            <ArrowUpRight />
          </Link>
          <div className="">
            <img
              src={"/image/work/4kadventure.png"}
              alt=""
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-between gap-6 px-4">
            <div className="flex  justify-between items-center">
              <p className="text-2xl font-semibold">4K Adventure and tours</p>
              <p className="text-2xl text-gray-400 font-medium">2025</p>
            </div>
            <p className="font-medium text-gray-600">
              4K is a pioneering travel agency for tours within and outside of
              Trinidad and Tobago, creating unique experiences and special
              memories for its clients.
            </p>
          </div>
        </div>
        <div className="bg-white flex flex-col p-2 rounded-xl gap-[30px] relative">
          <Link
            className="absolute right-4 top-4 bg-white rounded-full p-2 border"
            href={"https://pagoconcarnet.cl/"}
            target="_blank"
          >
            <ArrowUpRight />
          </Link>
          <div className="">
            <img
              src={"/image/work/conectados.png"}
              alt=""
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-between gap-6 px-4">
            <div className="flex  justify-between items-center">
              <p className="text-2xl font-semibold">Ahora conectados</p>
              <p className="text-2xl text-gray-400 font-medium">2025</p>
            </div>
            <p className="font-medium text-gray-600">
              A platform that helps Chileans pay better and reactivate the small
              economy.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xl font-semibold text-white w-full md:w-1/3">
          Clean and straight-forward design makes your users fall in love with
          your product at the very first sight.
        </p>
        <div className="mt-5 w-fit relative flex items-center hover:-translate-x-1 hover:-translate-y-1 transition-all">
          <Button
            className="bg-white rounded-full  hover:bg-black/50 text-black hover:bg-white"
            size={"lg"}
          >
            Let discuss
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

export default Work;
