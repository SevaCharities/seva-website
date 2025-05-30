import { InstagramLogo, Envelope, Phone } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import FAQ from "./FAQ";

const contacts = [
  {
    icon: <Envelope size={32} />,
    name: "sevacharities@gmail.com",
    link: "mailto:sevacharities@gmail.com",
  },
  {
    icon: <InstagramLogo size={32} />,
    name: "@sevacharities",
    link: "https://www.instagram.com/sevacharities/",
  },
  { icon: <Phone size={32} />, name: "+1 (234) 567 8910" },
];

export default function Footer() {
  return (
    <section className=" bg-green-0 p-16 mt-32">
      <div className="flex flex-wrap justify-center gap-4 text-center">
        <h6>
          <span className=" bg-white text-black px-2 font-semibold">
            Join Seva!
          </span>{" "}
          We truly do believe in the power of giving and that college students,
          if passionate enough, can make a difference!
        </h6>
        <div className="  flex justify-center ">
          <Link href="https://bit.ly/joinseva2425" target="_blank">
            <button className="bg-green-500 hover:bg-green-400 hover:text-black text-white font-semibold py-4 px-4  border-b-4 border-green-700 hover:border-green-500 rounded-xl active:scale-95">
              <p>🫵 Become a Member</p>
            </button>
          </Link>
        </div>
      </div>
      <FAQ />
      <div id="contact-us" className="flex flex-wrap mt-20  md:justify-between items-center gap-4">
        <div className="text-center">
          <h2>Contact Us</h2>
          <p>Want to collaborate with us?</p>
        </div>
        <Image
          src="/seva_logo_green.svg"
          alt="seva charities"
          width={300}
          height={300}
        />
        <div className="flex flex-col gap-4">
          {contacts.map((contact, index) => {
            const { icon, name, link } = contact;
            return link ? (
              <Link key={index} href={link} target="_blank">
                <div className="flex items-center gap-2">
                  {icon}
                  <p>{name}</p>
                </div>
              </Link>
            ) : (
              <div key={index} className="flex items-center gap-2">
                {icon}
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
