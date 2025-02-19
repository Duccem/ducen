import img1 from "@/assets/ecommerce.jpg";
import img2 from "@/assets/logos.jpg";
import img3 from "@/assets/marketing.jpg";
import img4 from "@/assets/mobile-dev.jpg";
import { Button } from "@/lib/shadcn/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/shadcn/components/ui/carousel";
import { ArrowUpRight, Phone } from "lucide-react";
import "./sections.css";
const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-15px)] bg-white rounded-lg  justify-center items-center gap-10 px-4 md:px-[80px]">
      <div className="w-full md:w-1/2 flex flex-col justify-start items-center py-2">
        <p className="font-bold text-6xl text-start w-full">What we offer?</p>
        <p className="font-medium text-lg  ">
          At our studio, we specialize in delivering cutting-edge code
          development and strategic marketing solutions, designed to elevate
          your digital presence and drive impactful results for your business.
        </p>
        <div className="group hover:-translate-x-1 hover:-translate-y-1 transition-all self-start mt-8">
          <Button
            className="bg-neutral-900 text-2xl p-5 h-16 font-extralight [&_svg]:size-8 group-hover:bg-neutral-700  rounded-full"
            size={"lg"}
          >
            Book a call
          </Button>
          <Button
            className="rounded-full h-16 w-16  bg-neutral-900  group-hover:bg-neutral-700"
            size={"icon"}
          >
            <Phone />
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:px-[80px] gap-10 w-full md:w-1/2">
        <p className="text-3xl font-semibold">Our services</p>
        <Carousel className="p-1">
          <CarouselContent className="p-1">
            <CarouselItem>
              <div className="flex flex-col items-start border rounded-lg p-2 gap-3">
                <div className="rounded-md overflow-hidden">
                  <img
                    src={img1.src}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-3 px-4">
                  <p className="text-2xl font-semibold">E-commerce</p>
                  <p className="text-sm font-medium">
                    Your sales and revenue will triple by accessing digital
                    sales channels, where we guarantee control of your stock and
                    your electronic payments.
                  </p>
                  <div className="group hover:-translate-x-1 hover:-translate-y-1 transition-all flex items-center justify-end">
                    <Button
                      className="bg-neutral-900  p-5  font-extralight [&_svg]:size-8 group-hover:bg-neutral-700  rounded-full"
                      size={"lg"}
                    >
                      See projects
                    </Button>
                    <Button
                      className="rounded-full bg-neutral-900  group-hover:bg-neutral-700"
                      size={"icon"}
                    >
                      <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col items-start border rounded-lg p-2 gap-3">
                <div className="rounded-md overflow-hidden ">
                  <img
                    src={img2.src}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-3 px-4">
                  <p className="text-2xl font-semibold">Brand design</p>
                  <p className="text-sm font-medium">
                    Your digital presence begins with building a recognizable
                    brand. Start with us to design your logo, slogan, and brand
                    from scratch.
                  </p>
                  <div className="group hover:-translate-x-1 hover:-translate-y-1 transition-all flex items-center justify-end">
                    <Button
                      className="bg-neutral-900  p-5  font-extralight [&_svg]:size-8 group-hover:bg-neutral-700  rounded-full"
                      size={"lg"}
                    >
                      See projects
                    </Button>
                    <Button
                      className="rounded-full bg-neutral-900  group-hover:bg-neutral-700"
                      size={"icon"}
                    >
                      <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col items-start border rounded-lg p-2 gap-3">
                <div className="rounded-md overflow-hidden ">
                  <img
                    src={img3.src}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-3 px-4">
                  <p className="text-2xl font-semibold">Digital marketing</p>
                  <p className="text-sm font-medium">
                    Every click and every interaction counts. Learn how to
                    attract customers and turn your social media into the best
                    hook for your sales. Our experts will take you into the
                    future.
                  </p>
                  <div className="group hover:-translate-x-1 hover:-translate-y-1 transition-all flex items-center justify-end">
                    <Button
                      className="bg-neutral-900  p-5  font-extralight [&_svg]:size-8 group-hover:bg-neutral-700  rounded-full"
                      size={"lg"}
                    >
                      See projects
                    </Button>
                    <Button
                      className="rounded-full bg-neutral-900  group-hover:bg-neutral-700"
                      size={"icon"}
                    >
                      <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col items-start border rounded-lg p-2 gap-3">
                <div className="rounded-md overflow-hidden">
                  <img
                    src={img4.src}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-3 px-4">
                  <p className="text-2xl font-semibold">Mobile apps</p>
                  <p className="text-sm font-medium">
                    Become your customers favorite accessory, always in their
                    pockets. We will create unique experiences with cutting-edge
                    applications for your business.
                  </p>
                  <div className="group hover:-translate-x-1 hover:-translate-y-1 transition-all flex items-center justify-end">
                    <Button
                      className="bg-neutral-900  p-5  font-extralight [&_svg]:size-8 group-hover:bg-neutral-700  rounded-full"
                      size={"lg"}
                    >
                      See projects
                    </Button>
                    <Button
                      className="rounded-full bg-neutral-900  group-hover:bg-neutral-700"
                      size={"icon"}
                    >
                      <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Services;

