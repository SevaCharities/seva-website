"use client";

import { List } from "@phosphor-icons/react/dist/ssr";
import { log } from "console";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = {
  name: String;
  link?: [String, boolean];

};

export default function Navbar() {
  const pathname = usePathname();

  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState("");

  // name, [link, redirect]
  const navLinks: NavLink[] = [
    { name: "profile"},
    // { name: "home", link: ["/", false] },
    { name: "photos" },
    { name: "officers" },
    { name: "seva history" },
    { name: "general meetings" },
    { name: "upcoming"},
    { name: "calendar" },
    { name: "merch" },
    { name: "linktree", link: ["https://linktr.ee/sevacharities", true] },
    // { name: "contact us", link: ["/#contact-us", false] },
    { name: "FAQ", link: ["/FAQ", false] },
    { name: "donate", link: ["https://apusa.org/donate-today/", true] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setBgColor("bg-orange-2"); // Change color as desired
      } else {
        setBgColor("transparent");
      }
    };
    // init
    if (pathname == "/" && window.scrollY < 500) {
      setBgColor("transparent");
    } else {
      setBgColor("bg-orange-2");
    }

    if (pathname == "/") {
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
              <Image
                src="/seva_logo.png"
                alt="seva logo"
                width={42}
                height={42}
              />
              <h3 className=" pl-2 text-white font-semibold">Seva Charities</h3>
            </div>
          </Link>
          <div className="flex items-center gap-4">
          
            <button
              className="cursor-pointer "
              onClick={() => setShowScreen(!showScreen)}
            >
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
                <Link
                  href={`${getRoute(link)}`}
                  target={link.link && link.link[1] ? "_blank" : ""}
                  onClick={() => setShowScreen(!showScreen)}
                >
                  <button
                    className={` hover:text-green-2 sm:p-2 ${
                      getRoute(link) == pathname
                        ? "text-white"
                        : "text-yellow-0"
                    }`}
                  >
                    <h3 className=" text-lg sm:text-xl">{link.name}</h3>
                  </button>
                </Link>
                {index == 6 && (
                  <span className=" border-t border-2 border-orange-1  w-48 my-6"></span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function getRoute(link: NavLink): String {
  if (link.link) return link.link[0];
  return "/" + link.name.replace(/ /g, "-");
}
