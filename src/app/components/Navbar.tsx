"use client";

import { List } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type NavLink = {
  name: string;
  link?: [string, boolean];
};

export default function Navbar() {
  const pathname = usePathname();

  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState("");
  const [isMember, setIsMember] = useState<boolean | null>(null); // null = unknown, false = not member

  useEffect(() => {
    let cancelled = false;
    const fetchStatus = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const userId = session?.user?.id;
        if (!userId) {
          if (!cancelled) setIsMember(false);
          return;
        }

        const res = await fetch(`/api/member-status?userId=${userId}`);
        if (!res.ok) {
          if (!cancelled) setIsMember(false);
          return;
        }

        const json = await res.json();
        if (!cancelled) setIsMember(Boolean(json.is_member));
      } catch (err) {
        console.error("Navbar member fetch error:", err);
        if (!cancelled) setIsMember(false);
      }
    };

    fetchStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  const navLinksBase: NavLink[] = [
    { name: "profile" },
    { name: "gallery" },
    { name: "officers" },
    { name: "seva history" },
    { name: "general meetings" },
    { name: "upcoming" },
    { name: "calendar" },
    { name: "merch" },
    { name: "linktree", link: ["https://linktr.ee/sevacharities", true] },
    { name: "FAQ", link: ["/#faq", false] },
    { name: "donate", link: ["https://apusa.org/donate-today/", true] },
  ];

  // build final nav links: insert alumni only if isMember === true
  const navLinks: NavLink[] = [...navLinksBase];
  if (isMember === true) {
    // insert after 'seva history' (index 3) -> put at index 4
    navLinks.splice(4, 0, { name: "alumni" });
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setBgColor("bg-orange-2"); 
      } else {
        setBgColor("transparent");
      }
    };

    // init
    if (pathname === "/" && window.scrollY < 500) {
      setBgColor("transparent");
    } else {
      setBgColor("bg-orange-2");
    }

    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <>
      <div className={`fixed top-0 z-50 inset-x-0 ${bgColor}`}>
        <div className="mx-auto max-w-screen-xl flex px-8 sm:px-16 py-4 justify-between items-center">
          <Link href="/">
            <div className=" flex items-center hover:cursor-pointer">
              <Image src="/seva_logo.png" alt="seva logo" width={42} height={42} />
              <h3 className=" pl-2 text-white font-semibold">Seva Charities</h3>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button className="cursor-pointer " onClick={() => setShowScreen(!showScreen)}>
              <List size={32} color="white" weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {showScreen && (
        <div className="bg-orange-2 fixed inset-0 z-40 flex flex-col gap-2 justify-center items-center">
          {navLinks.map((link, index) => {
            return (
              <div key={index} className="flex flex-col items-center">
                {link.link && link.link[1] ? (
                  // external link
                  <a
                    href={link.link[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowScreen(false)}
                  >
                    <button
                      className={` hover:text-green-2 sm:p-2 ${
                        getRoute(link) === pathname ? "text-white" : "text-yellow-0"
                      }`}
                    >
                      <h3 className=" text-lg sm:text-xl">{link.name}</h3>
                    </button>
                  </a>
                ) : (
                  // internal link
                  <Link href={getRoute(link)} onClick={() => setShowScreen(false)}>
                    <button
                      className={` hover:text-green-2 sm:p-2 ${
                        getRoute(link) === pathname ? "text-white" : "text-yellow-0"
                      }`}
                    >
                      <h3 className=" text-lg sm:text-xl">{link.name}</h3>
                    </button>
                  </Link>
                )}

                {index === 6 && <span className=" border-t border-2 border-orange-1  w-48 my-6"></span>}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function getRoute(link: NavLink): string {
  if (link.link) return link.link[0];
  return "/" + link.name.replace(/ /g, "-");
}
