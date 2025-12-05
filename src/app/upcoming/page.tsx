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
    title: "Christmas Warehouse Phil 🎁",
    category: 1,
    date: ["Sat, Dec 6", "Christmas Cheer Warehouse, 6510 S. Congress Ave", "9 A.M. - 12 P.M."],
    description: "We’ll be volunteering with the Salvation Army to get their Angel Tree Christmas Warehouse ready for families in need. Tasks include unpacking and organizing toys, sorting clothing, decorating the warehouse, setting up shelves, and helping fulfill children’s holiday wishes.",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLScPB6SFjTv8gwKfO3Z6m5H60zV37_yz5r6EAD4sfaZ0e0gXGQ/viewform?usp=dialog", true],
  },
  {
    title: "Boat Formal 🛥️",
    category: 8,
    date: ["Tues, Dec 9", "Goldsmith Hall (photoshoot) and Lady Bird Lake (boat)", "4:30 P.M. - 9 P.M."],
    description: "Join us for our annual Seva boat formal! Details will be sent out to those invited (get more Seva points by being more involved to attend!).",
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