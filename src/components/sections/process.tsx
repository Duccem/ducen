import { Button } from "@/lib/shadcn/components/ui/button";
import { BookUp, FileCheck, FileCode, RefreshCcw, Rocket } from "lucide-react";

const Process = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-[20px] my-[100px] md:px-[80px]">
      <div className="md:row-start-1 md:col-start-4 md:col-span-2 md:row-span-2 block md:hidden">
        <p className="text-4xl text-white font-semibold">
          Simple steps toward product launch
        </p>
        <p className="text-2xl text-gray-300">
          Our work process is crafted to optimize for speedy and quality product
          outcomes
        </p>
      </div>
      <div className="group flex md:col-start-1 col-span-1">
        <Button className="bg-white font-medium text-xl p-5 h-16  group-hover:bg-white  rounded-full text-black w-3/4">
          Initial request
        </Button>
        <Button
          className="rounded-full h-16 w-16 bg-white  group-hover:bg-white text-black [&_svg]:size-6  "
          size={"icon"}
        >
          <FileCheck />
        </Button>
      </div>
      <div className="group flex md:row-start-2 md:col-start-2 col-span-1">
        <Button className="bg-white font-medium text-xl p-5 h-16  group-hover:bg-white  rounded-full text-black w-3/4">
          Proposal
        </Button>
        <Button
          className="rounded-full h-16 w-16 bg-white  group-hover:bg-white text-black [&_svg]:size-6  "
          size={"icon"}
        >
          <BookUp />
        </Button>
      </div>
      <div className="group flex md:row-start-3 md:col-start-3">
        <Button className="bg-white font-medium text-xl p-5 h-16  group-hover:bg-white  rounded-full text-black w-3/4">
          Development
        </Button>
        <Button
          className="rounded-full h-16 w-16 bg-white  group-hover:bg-white text-black [&_svg]:size-6  "
          size={"icon"}
        >
          <FileCode />
        </Button>
      </div>
      <div className="group flex md:row-start-4 md:col-start-4">
        <Button className="bg-white font-medium text-xl p-5 h-16  group-hover:bg-white  rounded-full text-black w-3/4">
          Refinement
        </Button>
        <Button
          className="rounded-full h-16 w-16 bg-white  group-hover:bg-white text-black [&_svg]:size-6  "
          size={"icon"}
        >
          <RefreshCcw />
        </Button>
      </div>
      <div className="group flex md:row-start-5 md:col-start-5">
        <Button className="bg-white font-medium text-xl p-5 h-16  group-hover:bg-white  rounded-full text-black w-3/4">
          Launch
        </Button>
        <Button
          className="rounded-full h-16 w-16 bg-white  group-hover:bg-white text-black [&_svg]:size-6  "
          size={"icon"}
        >
          <Rocket />
        </Button>
      </div>
      <div className="md:row-start-1 md:col-start-4 md:col-span-2 md:row-span-2 hidden md:block">
        <p className="text-4xl text-white font-semibold">
          Simple steps toward product launch
        </p>
        <p className="text-2xl text-gray-300">
          Our work process is crafted to optimize for speedy and quality product
          outcomes
        </p>
      </div>
      <div className="md:row-start-5 md:col-start-1 md:col-span-2">
        <p className="text-3xl font-light text-gray-200">
          We understand that every detail matters, so we will work and refine
          until we are both satisfied with the outputs.
        </p>
      </div>
    </div>
  );
};

export default Process;

