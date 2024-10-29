import Image from "next/image";
import Logo from "@/images/logo.png"
import { Button } from "@/components/ui/button";
import Link from "@/node_modules/next/link";
export default function Home() {
  return (
      <main className="">
        <section>
          <div className="flex flex-col bg-purple-500 justify-center items-center space-y-5 order-1 lg:-order-1 pb-10">
            <Image src={Logo} height={250} alt="Logo"/>
            <Button asChild className="px-20 bg-purple-700 p-10 text-xl">
              <Link href="/stories">Explore Story libraries</Link>
            </Button>
          </div>
          </section> 
   
      </main>
     
  );
}
