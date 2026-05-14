"use client";

import { CaretRightIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import Image from "next/image";

import { RippleButton } from "@/components/ui/ripple-button";
import UserForm from "@/components/forms/user-form";
import Footer from "@/app/(components)/footer";

export default function Home() {
  //state
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <main>
      <div className="relative min-h-[70vh] m-4 rounded-xl bg-[url('/images/firstbank-square.png')] bg-cover bg-center overflow-hidden">
        {/* gradient overlay — left-heavy, mirrors the Ecobank reference */}
        <div className="absolute inset-0 bg-linear-to-r from-brand/90 via-brand/50 to-transparent" />

        {/* content sits above the overlay */}
        <div className="relative h-[70vh] z-10  mx-6 my-4 flex  flex-col justify-between ">
          {/* Logo and clock */}
          <div className="py-6 flex justify-between items-center">
            <Image
              alt=""
              src={"/images/firstbank-logo.png"}
              width={200}
              height={200}
              priority
              quality={100}
            />
          </div>

          {/* Welcome text and form */}
          <div className="flex justify-between flex-wrap gap-6 items-end">
            <section>
              <h2 className="text-white font-bold text-4xl">
                Welcome to <br />
                First Bank Ghana
              </h2>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 px-4 py-2">
                <MapPinIcon
                  weight="fill"
                  className="size-4 text-white shrink-0"
                />
                <p className="text-white text-sm font-medium truncate">
                  FBG Bank Head Office Annex
                </p>
              </div>

              <p className="mt-3 text-white/80 text-sm md:text-xl lg:text-lg max-w-xs leading-relaxed">
                Send money securely to any First Bank account; fast, simple, and
                reliable.
              </p>
            </section>
            <section>
              <RippleButton
                rippleColor="#ffbd00"
                className="rounded-full gap-2 bg-brand text-white border-amber-400/50 border-1"
                onClick={() => {
                  setFormOpen(!formOpen);
                }}
              >
                Get started
                <CaretRightIcon weight="bold" className="size-4" />
              </RippleButton>
            </section>
          </div>
        </div>

        <UserForm open={formOpen} onOpenChange={setFormOpen} />
      </div>

      <Footer />
    </main>
  );
}
