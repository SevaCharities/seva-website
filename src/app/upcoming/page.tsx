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
    title: "Cuddle for a Cause 🐻",
    category: 1,
    date: ["Tues, Oct 28", "Lark Lounge", "6:30 P.M. - 8:30 P.M."],
    description: "Seva’s first on-campus philanthropy of the semester is here! Join us as we team up with TexasTHON to spread love and comfort in the sweetest way — by making stuffed animals 🐻💖. All creations will be donated to the Austin Children’s Shelter.",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSeRXzVuCfVYdIHhTYAbKhpY4Sl9xIGROrYnRf1VXfNMVjLEvg/viewform", true],
  },
  {
    title: "The Great Pumpkin Carving Social 🎃",
    category: 2,
    date: ["Wed, Oct 29", "South Mall Lawn", "6 P.M. - 8 P.M."],
    description: "Its the Great Pumpkin...carve!🎃 Join us for the perfect fall activity to kick off Halloweekend🎊",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLScJORsk5qqnKcL7fHQw0Kmkevk3JsMPHh_bA-pj3PDsAGa6Mw/viewform", true],
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