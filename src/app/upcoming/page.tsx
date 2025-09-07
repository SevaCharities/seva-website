import InteractiveEnvelope from "../components/InteractiveEnvelope";
import Link from "next/link";

export type UpcomingEventsProps = {
  title: string;
  category: number;
  date: string[];
  description: string;
  link?: [string, boolean];
};

const UpcomingEventsInfo: UpcomingEventsProps[] = [
  {
    title: "GM 1 (Info Session #2) 👤",
    category: 1,
    date: ["Mon, Sep 8", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "The first general meeting of the year! Meet our officers and make some new friends. This is also an info session and a time to get to ask any questions you have about Seva!",
  },
  {
    title: "Pizza Press Profit Share 🍕",
    category: 2,
    date: ["Mon, Sep 8", "Pizza Press", "6 P.M. - 8 P.M."],
    description: "Profit share at Pizza Press! Help raise some money for Seva while also eating some delicious pizza! This is right after GM so feel free to attend GM as well and we can all head there together!",
  },
  {
    title: "Recruitment Phil (Drip Flip) 👚",
    category: 3,
    date: ["Wed, Sep 10", "Location: West Mall", "Time: 4 P.M. - 7 P.M."],
    description: "This is what Seva is all about! Come serve with us at Seva and bring your clean, gently used clothes to donate or even trade with others for better clothes!",
  },
  {
    title: "Recruitment Party 🎉",
    category: 4,
    date: ["Fri, Sep 12", "Location: TBA", "10:30 P.M."],
    description: "Get hype for SEVA's first party of the year!! Free for members and $8 for non-members.",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSe20D_I1coIRF5U0S0rkMjRcu04W2gU2Bxp1fD719dvYRGdUw/viewform?usp=header", true],
  },
  {
    title: "GM 2 (In-Meeting Phil) 👤",
    category: 5,
    date: ["Mon, Sep 15", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "The second general meeting of the year! We will have an in-house phil so definitely come and try to get some extra points and serve our community!",
  },
  {
    title: "Guess or Else.. ❔",
    category: 6,
    date: ["Fri, Sep 19", "WCP Ballroom", "5 P.M. - 8 P.M."],
    description: "Seva Charities presents Guess or Else, an exciting game show containing elements of songs, movies and celebrities. Students may form teams of 5 members and participate in this fun challenge with many twists and turns! Gifts and prizes range from places like Austin Bouldering Project, Pizza Press, Shake Shack, Amy's and more!",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSc6YgVjne7DkMqpvw3cHS1dT4HBVbWjJSXIEBubbDjxD5m_jA/viewform?usp=header", true],
  },
  {
    title: "Cherry Creek Phil 🌎",
    category: 7,
    date: ["Sat, Sep 20", "Cherry Creek", "Time: TBA"],
    description: "This is what Seva is all about! Come serve with us at Seva by attending a philanthropy event and learn more about how Seva serves the community around Austin and impacts the world 🌎",
  },
  {
    title: "Saanj 💃🏽",
    category: 8,
    date: ["Date: TBA", "Location: TBA", "Time: TBA"],
    description: "Get ready for Saanj! Our biggest event of the year with a cultural tone of Indian food and dance performances from dance teams around UT 🤘🏽!",
  },
];

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-orange-500 text-white p-1 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/api/placeholder/40/40" alt="Seva logo" className="mr-2 rounded-full" />
          <h1 className="text-2xl font-bold">Seva Charities</h1>
        </div>
        <button className="text-2xl">≡</button>
      </header>
      
      <div className="px-6 py-6 bg-orange-500 shadow-md flex justify-center items-center min-h-[88px]">
        <h2 className="text-3xl font-bold text-white flex items-center leading-relaxed mt-10">
          <span className="mr-2">✨</span>
          Coming Up!
          <span className="ml-2">🐘</span>
        </h2>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full">
          {UpcomingEventsInfo.map((event, i) => (
            <div key={event.title + i} className="w-80 md:w-96 h-full flex-shrink-0 p-4">
              <InteractiveEnvelope {...event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;