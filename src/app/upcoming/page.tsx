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
    title: "Volleyball Social",
    category: 1,
    date: ["Wed, Mar 4", "Pease Park Volleyball Courts", "5:30 P.M. - 7 P.M."],
    description: "Join us for a fun volleyball social at Pease Park! Whether you're a pro or just want to have fun, come out and play with us. All skill levels welcome!",
    link: ["https://docs.google.com/forms/d/1XZoV2fY0J3uPo6N5Qaa9pON06k2sqk3gMr9KS2kvRK4/edit", true]
  },
  {
    title: "It's My Park Day Phil",
    category: 2,
    date: ["Sat, Mar 7", "N Austin Community Garden/YMCA Pedestrian Walkway", "9 A.M. - 12 P.M."],
    description: "Join us for the My Park Day Phil! We'll be helping to clean up the park and make it a better place for everyone. It's a great way to give back to the community and enjoy the outdoors!",
    link: ["", false]
  },
  {
    title: "Seva Sips Pop-Up",
    category: 3,
    date: ["Sunday, Mar 8","Location Coming Soon", "10 A.M. - 2 P.M."],
    description: "Join us for our Seva Sips Pop-Up! We'll be selling delicious food and drinks to raise money for Akshaya Patra. Bring your friends and enjoy some tasty treats while supporting a great cause!",
    link: ["https://partiful.com/e/Q1tWijpbJP6pQlFurV95", true]
  }

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