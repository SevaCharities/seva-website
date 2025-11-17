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
    title: "Chai Tabling ☕",
    category: 1,
    date: ["Mon, Nov 17 - Thu, Nov 20", "Speedway", "10 A.M. - 4 P.M."],
    description: "Sign up for chai tabling! Enjoy some hot chai and help serve on Speedway!",
    link: ["https://docs.google.com/spreadsheets/d/10o0gUBjUIG63hPGec5VfBLiouhg3-LYqDz4Xzxvbmxc/edit?usp=sharing", true],
  },
  {
    title: "GM 6 / Potluck 🤝",
    category: 2,
    date: ["Mon, Nov 17", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Join us for our GM and Thanksgiving Potluck! Bring anything y'all want and have a good time eating good food!",
    link: ["https://docs.google.com/spreadsheets/d/13coaUFY1_5m3a3XvR_oxH0HGzYoCwFW9r0cJ1gtr0k4/edit?usp=sharing", true],
  },
  {
    title: "Panda Express Profit Share 🐼",
    category: 3,
    date: ["Mon, Nov 17", "Panda Express at the Union", "All Day!"],
    description: "Come help raise money for Seva and Panda Express by attending our profit share at the Union! We will also be heading there after GM, so pull up with us after GM! ",
  },
  {
    title: "GM 7 🤝",
    category: 4,
    date: ["Mon, Dec 1", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Join us for the 7th general meeting of the year!",
  },
  {
    title: "Gift Wrapping with Salvation Army 🎁",
    category: 5,
    date: ["Sat, Dec 6", "Location: TBD", "9 A.M. - 12 P.M."],
    description: "We will be gift wrapping with the Salvation Army, details TBD.",
  },
  {
    title: "Boat Formal 🛥️",
    category: 8,
    date: ["Tues, Dec 9", "Location: TBD", "Time: TBD"],
    description: "Join us for our annual Seva boat formal! More details will be revealed soon.",
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