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
    title: "Coffee Chat + Gong Cha Profit Share",
    category: 1,
    date: ["Wed, Jan 28", "Gong Cha @ Target on Guad", "5 P.M. - 7 P.M."],
    description: "Join us for a coffee chat at Gong Cha to learn more about our chair position! Also, we will be having a profit share there anyway, so show up to support Seva!",
  },
  {
    title: "Despicable Baking Show",
    category: 2,
    date: ["Thu, Jan 29", "Lark Lounge", "7 P.M. - 8:30 P.M."],
    description: "Join us with your circle for our baking competition! Bake with your circle members and come with your dish to see who wins the great bake-off!",
  },
  {
    title: "Recruitment Party",
    category: 3,
    date: ["Sat, Feb 7", "Block on 25th Rooftop", "10 P.M. - 2 A.M."],
    description: "Get hype for SEVA's first party of the year!! The pricing is free for members, $8 for non-members,  and there must be a SEPARATE form filled out for every ticket you purchase.",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSc3a6qJzCqx9ecEYq5m6gFA8Bp9IbLbVV2d4Q1F9fLGwFjdNQ/viewform?usp=dialog", true],
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