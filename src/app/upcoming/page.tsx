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
    title: "Pancake Night with Thon",
    category: 1,
    date: ["Thu, Nov 6", "2400 Leon St.", "7 P.M. - 2 A.M."],
    description: "Come join Seva and Thon for fundraising to support childhood cancer research. Pike appreciates the long-standing Pancake Night partnership and looks forward to hosting again. The February 2024 Pancake Night at the Pike House raised $8,600 for the patients and families at Dell Children’s Medical Center, so we have a goal to exceed!",
  },
  {
    title: "The Collective Phil 🫶",
    category: 2,
    date: ["Sat, Nov 8", "5801 Ainez Dr.", "9 A.M. - 2 P.M."],
    description: "Join us to help with beautification projects like 🌳 mulching the front landscape and trees, 🌼 building and planting a garden bed, 🎨 painting a beautiful mural, 🚶‍♀️ cleaning up the center trail, 🪵 adding fresh woodchips to the playground, and 🏐 tidying up the sand volleyball court!",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSd9bZU6W8yfw2BziGIbjDfPd0CO5LhmeBsx96fBwQINudgxQA/viewform?usp=dialog", true],
  },
  {
    title: "Dodgeball Circle Competition 🤽",
    category: 3,
    date: ["Wed, Nov 12", "Bellmont Dodgeball Courts", "6:30 P.M. - 8:30 P.M."],
    description: "Join us for the 2nd Circle Competition. This time, we will be playing dodgeball against each circle! Have a team chant to collect 5 more additional points for your circle!",
  },
  {
    title: "Camping 🏕️",
    category: 4,
    date: ["Fri, Nov 14 - Sat, Nov 15", "Colorado Bend State Park", "Time: TBD"],
    description: "Get ready for Seva camping! We'll go camping for the weekend and enjoy nature, games, and s'mores!",
  },
  {
    title: "Chai Tabling",
    category: 2,
    date: ["Mon, Nov 17 - Thu, Nov 20", "Speedway", "10 A.M. - 4 P.M."],
    description: "Sign up for chai tabling! Enjoy some hot chai and help serve on Speedway!",
    link: ["https://docs.google.com/spreadsheets/d/10o0gUBjUIG63hPGec5VfBLiouhg3-LYqDz4Xzxvbmxc/edit?usp=sharing", true],
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