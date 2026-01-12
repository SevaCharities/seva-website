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
    title: "Seva Tabling",
    category: 1,
    date: ["Tue, Jan 13", "Speedway", "9:30 A.M. - 4 P.M."],
    description: "We'll be tabling on Speedway for spring recruitment! Join us for more information on Seva Charities and our cause!",
  },
  {
    title: "Info Session",
    category: 2,
    date: ["Tue, Jan 20", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Join us for our spring info session and learn more about Seva and our philanthropic mission! Also, we will be releasing applications to become a chair on our board and make a bigger impact at Seva!",
  },
  {
    title: "Recruitment Phil",
    category: 3,
    date: ["Tue, Jan 20", "Location: TBD", "Time: TBD"],
    description: "Our first phil of the semester!",
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