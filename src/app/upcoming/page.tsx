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
    title: "Info Session / GM #8 (+ Chair Apps)",
    category: 1,
    date: ["Tue, Jan 20", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Join us for our spring info session / GM #8 and learn more about Seva and our philanthropic mission! Also, we will be releasing applications to become a chair on our board and make a bigger impact at Seva!",
  },
  {
    title: "Board Game Night",
    category: 2,
    date: ["Thu, Jan 22", "Lark Lounge", "6:30 P.M. - 8:30 P.M."],
    description: "Our first social of the semester! Join us for some fun and competitive board games to start off the semester!",
  },
  {
    title: "Recruitment Party",
    category: 3,
    date: ["Fri, Jan 23", "Location: TBD", "10 P.M. - 2 A.M."],
    description: "Get hype for SEVA's first party of the year!! The location will be announced on our instagram, @sevacharities, before the party, the pricing is free for members, $8 for non-members,  and there must be a SEPARATE form filled out for every ticket you purchase.",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSc3a6qJzCqx9ecEYq5m6gFA8Bp9IbLbVV2d4Q1F9fLGwFjdNQ/viewform?usp=dialog", true],
  },
  {
    title: "GM #9 (+ Chair Apps)",
    category: 4,
    date: ["Mon, Jan 26", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Join us for GM #9! We will have already released applications to become a chair on our board and make a bigger impact at Seva!",
  },
  {
    title: "Coffee Chat + Gong Cha Profit Share",
    category: 5,
    date: ["Wed, Jan 28", "Gong Cha @ Target on Guad", "5 P.M. - 7 P.M."],
    description: "Join us for a coffee chat at Gong Cha to learn more about our chair position! Also, we will be having a profit share there anyway, so show up to support Seva!",
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