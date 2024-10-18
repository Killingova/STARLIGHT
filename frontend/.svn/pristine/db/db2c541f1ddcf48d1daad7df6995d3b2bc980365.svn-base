"use client"
import Link from 'next/link';
import { useAuthContext } from "@/context/authcontext";

const NavBar = () => {

  const { token } = useAuthContext();

  return (
    <nav className="bg-gray-100 border-b border-gray-300">
      <div className="mx-auto flex items-center justify-center py-6">
        <div className="flex justify-start">
          {/* <img src="/images/logo_serviceschein.png" alt="Logo" className="w-fit" /> */}
          {token.length > 0 ? ( <ul className="flex space-x-16">
            <li className="text-gray-700 font-medium">
              <Link href="servicescheine" className="text-xl">
                Servicescheine
              </Link>
            </li>
            <li className="text-gray-700 font-medium">
              <Link href="/kunden" className="text-xl">
                Kunden
              </Link>
            </li>
            <li className="text-gray-700 font-medium">
              <Link href="/galerie" className="text-xl">
                Galerie
              </Link>
            </li>
          </ul>) : (<></>) }
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default NavBar;
