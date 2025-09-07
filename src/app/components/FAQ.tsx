"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import Link from "next/link";

const info: infoProps[] = [
  {
    question:
      "What does the time commitment look like and how can I get more involved?",
    answer:
      "Seva is very flexible and you can be as involved as you can! We have many opportunities for our members to be engaged socially and philanthropically through socials, circle meetings, volunteering and cultural events",
  },
  {
    question: "Where can I find more information about all our events?",
    answer:
      "Our General Meetings and GroupMe are the best places to learn about and sign up for upcoming events and socials. You should also check out our <a href='/upcoming'><b>Upcoming page</b></a> and follow us on <a href='https://www.instagram.com/sevacharities/' target='_blank'><b>Instagram</b></a>",
  },
  {
    question: "How often do we meet?",
    answer:
      "We hold General Meetings every other Monday at 6:30 pm. We also will have various socials, fundraising events, and philanthropic events each month for our members! These meetings and events are not mandatory, but are highly encouraged. <br/></br>Check out the <a href='/general-meetings'><b>General Meetings page.</b></a>",
  },
  {
    question: "How does Seva Charities help Akshaya Patra?",
    answer:
      "We hold social media campaigns and events open to the UT community where all proceeds are donated to Akshaya Patra. Last year, we were able to raise $12,758, which was enough to feed 638 kids for a year!",
  },
  {
    question: "How do I become a member?",
    answer:
      "Just sign up using our Membership Form, pay dues ($50 for the entire year! and $60 if you want our custom t-shirt as well!), and join our GroupMe. That's it! </br></br>Check out our <a href='https://docs.google.com/forms/d/e/1FAIpQLSeBCrT9Hq87pmHwejdbGOn8QK-Gm6cUa_mbn1P1vOlCEBh03Q/viewform?usp=dialog' target='_blank'><b>Membership Form</b></a> and <a href='https://linktr.ee/sevacharities' target='_blank'><b>Linktree.</b></a>",
  },
];

type infoProps = {
  question: string;
  answer: string;
};

const FAQ = () => {
  return (
    <div
      id="FAQ"
      className="w-full max-w-4xl mx-auto rounded-2xl bg-white border-4 border-orange-400 shadow-lg flex flex-col justify-center items-center p-8 gap-6 my-16 text-center"
    >
      {/* Title with elephants */}
      <h2 className="text-3xl font-bold text-black tracking-wide">
        FAQ 🤔
      </h2>

      <Accordion
        variant="bordered"
        selectionMode="multiple"
        className="w-full max-w-3xl text-left"
      >
        {info.map((i, index) => (
          <AccordionItem
            key={index}
            title={
              <span className="flex items-center gap-2">
                <span>🐘</span>
                <span>{i.question}</span>
              </span>
            }
            className="border-b border-gray-200"
          >
            <div
              className="text-sm sm:text-base text-gray-700 py-4"
              dangerouslySetInnerHTML={{ __html: i.answer }}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
export default FAQ;



