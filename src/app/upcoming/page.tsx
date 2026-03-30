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
    title: "Seva Assassins (Circle Competition",
    category: 1,
    date: ["Thu, Mar 26 - Thu, Apr 2","UT Austin", "Week-long, ends Thursday evening"],
    description: "Each Circle will be assigned another circle to eliminate. The rules are posted in the link below.",
    link: ["https://docs.google.com/spreadsheets/d/1KL-2xAdzEbm2Z0T4sB0hXWEhEkEqlMM4PWMn0EA7LqM/edit?usp=sharing", true]
  },
  {
    title: "Seva Zilker Park Social",
    category: 2,
    date: ["Thu, Apr 2","Zilker Park", "5:30 P.M. - 8 P.M."],
    description: "A fun evening of sports and chilling at Zilker Park!",
  },
  {
    title: "Lakehouse",
    category: 2,
    date: ["Fri, Apr 4 - Sun, Apr 6","TBD", "Friday afternoon - Sunday morning"],
    description: "Join us at a lakehouse for a great weekend of fun! Invited members only, details will be given out during Wednesday's mandatory meeting.",
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