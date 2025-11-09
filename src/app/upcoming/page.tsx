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
    title: "Dodgeball Circle Competition 🤽",
    category: 1,
    date: ["Wed, Nov 12", "Bellmont Dodgeball Courts", "6:30 P.M. - 8:30 P.M."],
    description: "Join us for the 2nd Circle Competition. This time, we will be playing dodgeball against each circle! Have a team chant to collect 5 more additional points for your circle!",
  },
  {
    title: "Camping 🏕️",
    category: 2,
    date: ["Fri, Nov 14 - Sat, Nov 15", "Colorado Bend State Park", "Fri, 2 P.M. - Sat, 1 P.M."],
    description: "Get ready for Seva camping! We'll go camping for the weekend and enjoy nature, games, and s'mores! Check the form below for more details!",
    link: ["https://docs.google.com/forms/d/1M7pS1kSq20MU_rz6SHs3cciF5tAv1eQ4nZ1rCjmDIzI/viewform?edit_requested=true", true],
  },
  {
    title: "Chai Tabling ☕",
    category: 3,
    date: ["Mon, Nov 17 - Thu, Nov 20", "Speedway", "10 A.M. - 4 P.M."],
    description: "Sign up for chai tabling! Enjoy some hot chai and help serve on Speedway!",
    link: ["https://docs.google.com/spreadsheets/d/10o0gUBjUIG63hPGec5VfBLiouhg3-LYqDz4Xzxvbmxc/edit?usp=sharing", true],
  },
  {
    title: "GM 6 🤝",
    category: 4,
    date: ["Mon, Nov 17", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Join us for the 6th general meeting of the year!",
  },
  {
    title: "Panda Express Profit Share 🐼",
    category: 5,
    date: ["Mon, Nov 17", "Panda Express at the Union", "All Day!"],
    description: "Come help raise money for Seva and Panda Express by attending our profit share at the Union! We will also be heading there after GM, so pull up with us after GM! ",
  },
  {
    title: "GM 7 🤝",
    category: 6,
    date: ["Mon, Dec 1", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Join us for the 7th general meeting of the year!",
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