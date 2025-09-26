"use client";

import { InstagramLogo, Envelope, Phone } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import FAQ from "./FAQ";
import React from "react";

type Contact = {
  icon: JSX.Element;
  name: string;
  link?: string;
};

const contacts: Contact[] = [
  {
    icon: <Envelope size={24} />,
    name: "sevacharities@gmail.com",
    link: "mailto:sevacharities@gmail.com",
  },
  {
    icon: <InstagramLogo size={24} />,
    name: "@sevacharities",
    link: "https://www.instagram.com/sevacharities/",
  },
  { icon: <Phone size={24} />, name: "+1 (469) 358 6268" },
];

const benefitCategories = [
  {
    title: "Service & Impact",
    icon: "🤝",
    benefits: [
      "Access to all philanthropy projects & volunteering"
    ]
  },
  {
    title: "Social & Community",
    icon: "🎉",
    benefits: [
      "Exclusive socials & mixers",
      "Circles (Small groups competing and having fun year-round)",
      "Free member-only parties",
      "Free intramural sports teams"
    ]
  },
  {
    title: "Special Events",
    icon: "✨",
    benefits: [
      "Access to Camping trips & M&D events",
      "Chances for invites to end of semester celebrations such as boat formal and Lakehouse!",
      "Discounted event prices"
    ]
  },
  {
    title: "Professional Growth",
    icon: "📈",
    benefits: [
      "Alumni database access for networking",
      "Leadership opportunities"
    ]
  }
];

export default function Footer(): JSX.Element {
  return (
    <section className="bg-green-50 pt-8 pb-16 px-6 md:px-16 mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-semibold">
          <span className="text-black px-2">Join Seva!</span>
        </h3>
        <p className="mt-2 text-gray-700">
          We truly believe in the power of giving — college students can make a
          real difference.
        </p>

        <div className="mt-6 flex flex-col items-center space-y-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeBCrT9Hq87pmHwejdbGOn8QK-Gm6cUa_mbn1P1vOlCEBh03Q/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-xl border-b-4 border-green-700 hover:border-green-500 transition-transform active:scale-95"
          >
            🫵 Become a Member
          </a>

          <p className="max-w-2xl">
          Not a member yet? That&apos;s okay — our events are open to all, but
            members get early access, exclusive perks, and a bigger say.
          </p>
          <Link href="/upcoming" className="inline-block">
            <span className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-xl border-b-4 border-green-700 hover:border-green-500 transition-transform active:scale-95">
              Get Involved – Events & More 👈
            </span>
          </Link>

          <p className="max-w-2xl">
          If you are a member, sign in on the Profile page below and access our premium, 
          exclusive Alumni database to connect with our former Seva members!
          </p>
          <Link href="/profile" className="inline-block">
            <span className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-xl border-b-4 border-green-700 hover:border-green-500 transition-transform active:scale-95">
              Sign In – Profile 🪪
            </span>
          </Link>
          <Link href="/alumni" className="inline-block">
            <span className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-xl border-b-4 border-green-700 hover:border-green-500 transition-transform active:scale-95">
              Access our Alumni Database 🎓
            </span>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Member Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefitCategories.map((category, categoryIdx) => (
              <div
                key={categoryIdx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-semibold text-lg text-gray-800">{category.title}</h3>
                </div>
                <ul className="space-y-3 text-left">
                  {category.benefits.map((benefit, benefitIdx) => (
                    <li
                      key={benefitIdx}
                      className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed"
                    >
                      <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <FAQ />
        </div>

        <div
          id="contact-us"
          className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12"
        >
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p className="text-sm text-gray-600">Want to collaborate with us?</p>
          </div>

          <div className="mx-auto md:mx-0">
            <Image
              src="/seva_logo_green.svg"
              alt="seva charities"
              width={120}
              height={120}
              priority={false}
            />
          </div>

          <div className="flex flex-col gap-3">
            {contacts.map((contact, idx) =>
              contact.link ? (
                <a
                  key={idx}
                  href={contact.link}
                  target={contact.link.startsWith("http") ? "_blank" : undefined}
                  rel={contact.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3"
                >
                  {contact.icon}
                  <span className="text-sm">{contact.name}</span>
                </a>
              ) : (
                <div key={idx} className="flex items-center gap-3">
                  {contact.icon}
                  <span className="text-sm">{contact.name}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}