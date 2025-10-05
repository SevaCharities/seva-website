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
    title: "GM #3 (Circle Reveal) ⚪",
    category: 1,
    date: ["Mon, Oct 6", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Our third general meeting of the year, where we will reveal our Circles for the year! Show up to get access to our fun, small groups within Seva (if you haven't filled the form out, do so ASAP to get placed into a circle)! Also, we will be having an in-GM phil once again!",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSfhORYCYgLOM6Ys3mVHNdQiMUG1OCaaXWcq7pEYr_nm7dmNgw/viewform?usp=header", true],
  },
  {
    title: "Circle Competion 1 (Jeopardy) 🎲",
    category: 2,
    date: ["Thu, Oct 9", "Standard Lounge", "7 P.M. - 9 P.M."],
    description: "Our first circle competion of the semester! If you're part of our circles, show up and compete in a Jeopardy-style game to win points for your circle!",
  },
  {
    title: "Pickleball Social 🎾",
    category: 3,
    date: ["Wed, Oct 15", "Location: TBA", "Time: TBA"],
    description: "Come play some pickleball and compete with your fellow Seva members!",
  },
  {
    title: "LoCo Trash Bash Kayak Cleanup 🌿  🌊",
    category: 4,
    date: ["Sat, Oct 18", "HWY 183/Montopolis Bridge", "7AM - 11AM"],
    description: "Join us on Saturday, Oct 18 for a morning on the water! We’ll meet at 7 AM at the HWY 183/Montopolis Bridge and float/clean our way down to the Texas River School. Come help keep the Colorado River sparkling — even a few hours makes a difference 💙✨",
  },
  {
    title: "GM #4",
    category: 5,
    date: ["Mon, Oct 20", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Come join us for the last GM before Saanj!",
  },
  {
    title: "Saanj 💃🏽",
    category: 8,
    date: ["Fri, Oct 24", "WCP Ballroom", "4:30 P.M. - 9 P.M."],
    description: "Get ready for Saanj! Our biggest event of the year with a cultural tone of Indian food and dance performances from dance teams around UT 🤘🏽!",
    link: ["https://forms.gle/vFJ4KjtmJAkgbirL8", true],
  },
  {
    title: "Raath 🎉",
    category: 9,
    date: ["Date: Oct 24", "Location: TBA", "10 P.M. - 2 A.M."],
    description: "The Saanj afterparty (free if you went to Saanj)! Buy your tickets as soon as possible and come to Raath ready to have fun and celebrate the biggest night for Seva of the year!",
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