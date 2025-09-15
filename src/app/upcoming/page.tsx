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
    title: "GM #2 (In-Meeting Phil) 👤",
    category: 1,
    date: ["Mon, Sep 15", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "The second general meeting of the year! We will have an in-house phil so definitely come and try to get some extra points and serve our community!",
  },
  {
    title: "Guess or Else.. ❔",
    category: 2,
    date: ["Fri, Sep 19", "WCP Ballroom", "5 P.M. - 8 P.M."],
    description: "Seva Charities presents Guess or Else, an exciting game show containing elements of songs, movies and celebrities. Students may form teams of 5 members and participate in this fun challenge with many twists and turns! Gifts and prizes range from places like Austin Bouldering Project, Pizza Press, Shake Shack, Amy's and more!",
    link: ["https://docs.google.com/forms/d/e/1FAIpQLSc6YgVjne7DkMqpvw3cHS1dT4HBVbWjJSXIEBubbDjxD5m_jA/viewform?usp=header", true],
  },
  {
    title: "Cherry Creek Phil 🌎",
    category: 3,
    date: ["Sat, Sep 20", "5618 Bayton Loop, Austin, Texas", "Time: 9 A.M. - 11 A.M."],
    description: "This is what Seva is all about! Come serve with us at Seva by attending a philanthropy event and learn more about how Seva serves the community around Austin and impacts the world 🌎",
    link: ["https://docs.google.com/spreadsheets/d/1fAH06bdJ3dm9gUUqhXGluWZ_Lcoor_qSJNR4MZYCLtY/edit?usp=sharing", true],
  },
  {
    title: "GM #3 (Circle Reveal) ⚪",
    category: 4,
    date: ["Mon, Sep 29", "UTC 1.102", "6:30 P.M. - 8 P.M."],
    description: "Our third general meeting of the year, where we will reveal our Circles for the year! Show up to get access to our fun, small groups within Seva!",
  },
  {
    title: "Cabo Bob's Profit Share 🌯",
    category: 5,
    date: ["Wed, Oct 1", "Cabo Bob's Burritos, 2828 Rio Grande St, Austin, TX 78705, USA", "5 P.M. - 9 P.M."],
    description: "Profit share at Cabo Bob's! Help raise some money for Seva while also eating some of the best food in town!",
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