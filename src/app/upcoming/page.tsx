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
    title: "Potatogram Tabling",
    category: 1,
    date: ["Tue, Feb 10", "Speedway", "10 A.M. - 4 P.M."],
    description: "It's Valentine's Season! Fill out this form to send a potato to that special partner, friend or roommate!",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSci3HChPL-BD0IR1sEv5o_RETLO9rMOWwOgTKGFW2muxB1m5A/viewform?usp=header", true],
  },
  {
    title: "Austin Marathon Phil",
    category: 2,
    date: ["Sun, Feb 15", "Mile 23 Station", "7:30 A.M. - 2 P.M."],
    description: "Seva is an official partner of the Austin Marathon this year! This is our biggest philanthropy event of the year, and we’ll be volunteering alongside orgs like Texas Thon, SEEK, and The Collective.",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSfHLVZxBbxDiymEVhu8wTQ604wm2kV8KlO1j7PqhZRL3bqsCg/viewform?usp=header", true],
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