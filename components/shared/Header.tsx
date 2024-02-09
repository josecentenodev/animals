import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link
          href="/"
          className="w-36"
        >
          <Image
            src="/assets/images/animalsLogo.png"
            width={75}
            height={75}
            alt="Animals Logo"
            className="rounded-full"
          />
        </Link>

        <SignedIn>
            <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
            </nav>
          </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full bg-blue-800" size='lg'>
              <Link href='/sign-in'>
                Login
              </Link>
            </Button>
          </SignedOut>

        </div>
      </div>
    </header>
  );
};

export default Header;
