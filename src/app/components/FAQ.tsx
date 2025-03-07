"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
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
      "Our General Meetings and GroupMe are the best places to learn about and sign up for upcoming events and socials. You should also subscribe to our Member Calendar and follow us on Instagram!<br/></br>Check out the <a href='/general-meetings'><b>General Meetings tab</b></a> and <a href='https://linktr.ee/sevacharities' target='_blank'><b>Linktree</b></a>.",
  },
  {
    question: "How often do we meet?",
    answer:
      "We hold General Meetings every other Monday at 6:30 pm. We also will have various socials, fundraising events, and philanthropic events each month for our members! These meetings and events are not mandatory, but are highly encouraged. <a href='http://bit.ly/sevacalendar' target='_blank'><b>Check out the calendar!</b></a>",
  },
  {
    question: "How does Seva Charities help Akshaya Patra?",
    answer:
      "We hold social media campaigns and events open to the UT community where all proceeds are donated to Akshaya Patra. Last year, we were able to raise $12,758, which was enough to feed 638 kids for a year!",
  },
  {
    question: "How do I become a member?",
    answer:
      "Just sign up using our Membership Form, pay dues ($40 for the entire year!), and join our GroupMe. That's it! </br></br>Check out our <a href='https://linktr.ee/sevacharities' target='_blank'><b>Linktree</b></a>.",
  },
];

type infoProps = {
  question: string;
  answer: string;
};

const FAQ = () => {
  const [toggle, setToggle] = useState(new Array(info.length).fill(1));
  return (
    <div id="FAQ" className="w-full min-h-52 rounded-lg bg-orange-0 my-12 flex flex-col justify-center items-center p-4 pb-8 gap-4">
      <h2 className="sm:py-6">FAQ 🤔</h2>

      <Accordion
        className=""
        selectionMode="multiple"
        isCompact
        variant="bordered"
      >
        {info.map((i, index) => {
          return (
            <AccordionItem
              key={index}
              aria-label={i["question"]}
              title={<h4 className="text-sm  sm:text-2xl">{i["question"]}</h4>}
              className="py-2"
            >
              <p
                className="text-xs sm:text-lg py-4"
                dangerouslySetInnerHTML={{ __html: i["answer"] }}
              ></p>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
export default FAQ;
