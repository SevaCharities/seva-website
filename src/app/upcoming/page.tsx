import InteractiveEnvelope from "../components/InteractiveEnvelope";
import Link from "next/link";

const globalStyles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
`;

export type UpcomingEventsProps = {
  title: string;
  category: number;
  date: string[];
  description: string;
  link?: [string, boolean];
};

const UpcomingEventsInfo: UpcomingEventsProps[] = [
  {
    title: "GM 14 🫱🏻‍🫲🏿",
    category: 1,
    date: ["Mon, Apr 21", "6:30 P.M.", "UTC 4.102"],
    description: "The last GM of the month! Pull up! We will reveal a new badge!",
  },
  {
    title: "Senior Send-Off 👋🏾",
    category: 2,
    date: ["Mon, Apr 26", "5:30 - 7:30 P.M."],
    description: "Celebrate our Seva seniors 🥲🥹 We would LOVE for all of y'all to come out to Senior Sendoff to spend time with the seniors, hear speeches from them 🎤, take cute photos📸, and eat some good food 🥪",
    link: ["https://forms.gle/5pyJeqd7RWK7UHWu9", true],
  },
  {
    title: "Blanket Phil 🧺",
    category: 3,
    date: ["Mon, Apr 17", "6 - 8 P.M.", "UTC 1.130"],
    description: "We're going to be collabing with HOSA to make blankets for animal shelters in Austin!Come out for a chill and fun time with some new people!",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSdeoux6uDYj0MBXn2PDFPtH5KJIAcsx6Xwy6uoLFsIxMc1kBw/viewform?usp=header", true],
  },
  {
    title: "Mango Lassi Tabling 🥭",
    category: 4,
    date: ["Mon, Apr 14 - Tues, Apr 15", "10 A.M. - 4 P.M.", "Speedway"],
    description: "We will be selling Mango Lassi on Monday and Tuesday next week! Help us volunteer and sell da juice 🥭 on Speedway",
    link: ["https://docs.google.com/spreadsheets/d/1KDsgEEdC8q12xZ9QPdCtfzY8fHDoIePfz-aEMboMM-0/edit?gid=0#gid=0", true],
  },
];

const Page = () => {
  return (
    <>
      <div className="..."
        style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
        }}
>
</div>
      <div className="flex flex-col h-screen">
        <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/api/placeholder/40/40" alt="Seva logo" className="mr-2 rounded-full" />
            <h1 className="text-2xl font-bold">Seva Charities</h1>
          </div>
          <button className="text-2xl">≡</button>
        </header>
        
        <div className="px-6 py-4 bg-gradient-to-r from-orange-300 to-yellow-200 shadow-md">
          <h2 className="text-3xl font-bold text-orange-800 flex items-center">
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
    </>
  );
};

export default Page;