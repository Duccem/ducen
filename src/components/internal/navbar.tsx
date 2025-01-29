import logo from '@/assets/lumen-dark.png';
import { Button } from '@/lib/shadcn/components/ui/button';
import { Phone } from 'lucide-react';
import Link from 'next/link';
const Navbar = () => {
  return (
    <div className="w-full flex justify-between   items-center">
      <Link href={'/'} className="flex justify-start items-center gap-3">
        <img src={logo.src} alt="" className="h-[50px]" />
        <p className="text-white text-3xl font-semibold">Lumen</p>
      </Link>
      <div className="flex justify-between items-center gap-4 text-white bg-neutral-900 p-3 rounded-lg">
        <Link
          href={'/services'}
          className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300"
        >
          About us
        </Link>
        <Link
          href={'/services'}
          className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300"
        >
          Services
        </Link>
        <Link
          href={'/services'}
          className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300"
        >
          Process
        </Link>
        <Link
          href={'/services'}
          className="hover:bg-neutral-700 p-3 rounded-md transition-colors duration-300"
        >
          Pricing
        </Link>
      </div>
      <div>
        <Link href={'http://cal.com/jose-manuel-veliz/15min'}>
          <Button className="bg-neutral-900 hover:bg-neutral-700">
            <Phone />
            Book a call
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

