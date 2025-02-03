import faq from '@/assets/faq.jpg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/lib/shadcn/components/ui/accordion';
const Questions = () => {
  return (
    <div className="grid grid-cols-2 px-[80px] mt-[250px]">
      <div className="flex flex-col justify-start h-full gap-4">
        <p className="text-white font-semibold text-5xl">
          Frequently Asked Questions
        </p>
        <div className="flex flex-col">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white px-4 rounded-2xl">
              <AccordionTrigger className="text-xl">
                Whats services offer Lumen?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                At lumen we offer different development and marketing services,
                since web and mobile development and maintain to digital
                marketing, logo and brand design to community and social
                management.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-white px-4 rounded-2xl">
              <AccordionTrigger className="text-xl">
                What is the workflow process from start to project delivery?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Our process begins with an initial consultation to understand
                your needs. Then, we create a detailed plan, develop the project
                in stages, and conduct thorough testing before final delivery.
                We maintain constant communication to ensure the project meets
                your expectations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-white px-4 rounded-2xl">
              <AccordionTrigger className="text-xl">
                Can I make changes or adjustments during the project
                development?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Yes, we allow revisions and adjustments during development.
                However, significant changes outside the agreed scope may
                require adjustments to the timeline or budget.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-white px-4 rounded-2xl">
              <AccordionTrigger className="text-xl">
                How are project costs calculated?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Costs are calculated based on the project`s complexity,
                estimated development time, and required resources. We provide a
                detailed budget before starting.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="bg-white px-4 rounded-2xl">
              <AccordionTrigger className="text-xl">
                Do you offer maintenance services after project delivery?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Yes, we offer maintenance plans that include updates, backups,
                and technical support to ensure your site or app runs smoothly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="bg-white px-4 rounded-2xl">
              <AccordionTrigger className="text-xl">
                Are you available for long-term projects or only for one-time
                jobs?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                We are available for both long-term projects and one-time jobs.
                We adapt to each client`s needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" className="bg-white px-4 rounded-2xl">
              <AccordionTrigger className="text-xl">
                Do you work with partial payments or require full payment
                upfront?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                We work with partial payments. Typically, we request an initial
                percentage to start, and the rest is divided into installments
                based on project milestones.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="w-full  flex-1 flex justify-center items-center">
        <div className="h-[500px] rounded-lg overflow-hidden">
          <img src={faq.src} alt="" className="object-contain h-full" />
        </div>
      </div>
    </div>
  );
};

export default Questions;

