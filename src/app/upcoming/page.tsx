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
    title: "GM 5 🐝",
    category: 1,
    date: ["Mon, Nov 3", "UTC 1.102", "6:30 P.M. - 8:00 P.M."],
    description: "Another Seva GM! Come join us for our 6th general meeting of the year!",
  },
  {
    title: "The Collective Phil 🫶",
    category: 2,
    date: ["Sat, Nov 8", "Location: TBD", "Time: TBD"],
    description: "Come join us for the Collective Phil! Details will be sent out during GM and in the GroupMe.",
  },
  {
    title: "Dodgeball Circle Competition 🤽",
    category: 3,
    date: ["Wed, Nov 12", "Location: TBD", "6:30 P.M. - 8:30 P.M."],
    description: "Join us for the 2nd Circle Competition. This time, we will be playing dodgeball against each circle! Show up with a jersey to collect 5 more additional points for your circle!",
  },
  {
    title: "Camping 🏕️",
    category: 4,
    date: ["Fri, Nov 14 - Sat, Nov 15", "Location: TBD", "Time: TBD"],
    description: "Get ready for Seva camping! We'll go camping for the weekend and enjoy some nature and s'mores",
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