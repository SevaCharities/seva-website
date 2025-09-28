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
    title: "Paint and Sip Night!🍷🎨",
    category: 1,
    date: ["Tue, Sep 30", "Location: TBA", "Time: 6 P.M. - 8 P.M."],
    description: "Our next social is coming up on September 30th and this time… it’s a Paint and Sip Night! 🍷🎨 Let your creative side show and enjoy some of our famous mocktails made by our very own mixologist Rahul! This is a member only event so please pay your dues if you would like to attend! 💵 All supplies and drinks will be provided so just show up and have fun!✨"
  },
  {
    title: "Cabo Bob's Profit Share 🌯",
    category: 2,
    date: ["Wed, Oct 1", "Cabo Bob's Burritos, 2828 Rio Grande St, Austin, TX 78705, USA", "5 P.M. - 9 P.M."],
    description: "Profit share at Cabo Bob's! Help raise some money for Seva while also eating some of the best food in town!",
  },
  {
    title: "GM #3 (Circle Reveal) ⚪",
    category: 3,
    date: ["Mon, Oct 6", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Our third general meeting of the year, where we will reveal our Circles for the year! Show up to get access to our fun, small groups within Seva (if you haven't filled the form out, do so ASAP to get placed into a circle)! Also, we will be having an in-GM phil once again!",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSfhORYCYgLOM6Ys3mVHNdQiMUG1OCaaXWcq7pEYr_nm7dmNgw/viewform?usp=header", true],
  },
  {
    title: "Circle Competion 1 (Jeopardy) 🎲",
    category: 4,
    date: ["Thu, Oct 9", "Location: TBA", "7 P.M. - 9 P.M."],
    description: "Our first circle competion of the semester! If you're part of our circles, show up and compete in a Jeopardy-style game to win points for your circle!",
  },
  {
    title: "Saanj 💃🏽",
    category: 8,
    date: ["Date: TBA", "Location: TBA", "Time: TBA"],
    description: "Get ready for Saanj! Our biggest event of the year with a cultural tone of Indian food and dance performances from dance teams around UT 🤘🏽!",
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