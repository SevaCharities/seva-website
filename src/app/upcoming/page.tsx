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
    title: "Info Session #1 👋🏾",
    category: 1,
    date: ["Tues, Sep 2", "6:30 P.M.", "TBA"],
    description: "Join us for an info session! Come chat with us and learn more about what Seva has to offer! We will be having Taco Bell at the event!",
  },
  {
    title: "Party on the Plaza Tabling 🕺",
    category: 2,
    date: ["Wed, Sep 3", "11 A.M. - 4 P.M.", "Gregory Gym Plaza"],
    description: "Join us for tabling on the Gregory Gym Plaza and Speedway!",
  },
  {
    title: "Recruitment Social 😄",
    category: 3,
    date: ["Thurs, Sep 4", "TBA", "TBA"],
    description: "A social to get to know members at Seva and also win gift cards playing carnival games 🎡🎪🎠!",
  },
  {
    title: "GM 1 (Info Session #2) 👤",
    category: 4,
    date: ["Mon, Sep 8", "6:30 P.M. - 7:30 P.M.", "UTC 1.102"],
    description: "The first general meeting of the year! Meet our officers and make some new friends. This is also an info session and a time to get to ask any questions you have about Seva!",
  },
  {
    title: "Pizza Press Profit Share 🍕",
    category: 5,
    date: ["Mon, Sep 8", "6 P.M. - 8 P.M.", "Pizza Press"],
    description: "Profit share at Pizza Press! Help raise some money for Seva while also eating some delicious pizza! This is right after GM so feel free to attend GM as well and we can all head there together!",
  },
  {
    title: "Recruitment Phil",
    category: 6,
    date: ["Wed, Sep 10", "TBA", "TBA"],
    description: "This is what Seva is all about! Come serve with us at Seva by attending a philanthropy event and learn more about how Seva serves the community around Austin and impacts the world 🌎",
  },
  {
    title: "Recruitment Party",
    category: 7,
    date: ["Fri, Sep 12", "TBA", "TBA"],
    description: "Our first party of the year! Come join us for a night of fun!",
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