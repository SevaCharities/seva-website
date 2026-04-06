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
    date: ["Thu, Mar 26 - Thu, Apr 9","UT Austin", "Week-long, ends Thursday evening"],
    description: "Each Circle will be assigned another circle to eliminate. The rules are posted in the link below.",
    link: ["https://docs.google.com/spreadsheets/d/1KL-2xAdzEbm2Z0T4sB0hXWEhEkEqlMM4PWMn0EA7LqM/edit?usp=sharing", true]
  },
  {
    title: "GM 6 + In-Meeting Phil",
    category: 2,
    date: ["Mon, Apr 6","UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Our 6th general meeting of the semester! We will also have an in-meeting philanthropy event, so definitely come join!",
  },
  {
    title: "Kayak Phil",
    category: 3,
    date: ["Sat, Apr 11", "8 A.M. - 10 A.M.", "TBD"],
    description: "Join us for kayaking and cleaning up the rivers!",
    link: ["", true]
  },
  {
    title: "Amazing Race",
    category: 4,
    date: ["Sun, Apr 12", "UT Campus", "3:30 P.M. - 5:30 P.M."],
    description: "How well do you know your amazing campus? Lead your team through a scavenger hunt across UT, but make sure to hurry! You'll be competing against other teams, with hundred of dollars of prizes up for grabs!",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSdGjHVVgT9BmpNUxH-9l4uin7VXmjWNu5FejulrWvk6f8p2Bw/viewform?usp=dialog", true]
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