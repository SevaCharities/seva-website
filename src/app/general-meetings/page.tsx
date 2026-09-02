import GMCard from "../components/GMCard";

export type GMProps = {
  meeting: number;
  slides?: string;
  date: string[];
  upcoming?: boolean;
};

const GMInfo: GMProps[] = [
  {
  meeting: 1,
  slides: "https://drive.google.com/file/d/18NVVE6xh4QN3XXWwUzdZCGMTz0X-uj-0/view?usp=sharing",
  date: ["Monday, August 31st", "6:30 PM", "UTC 4.102"],
  upcoming: false,
  }
];

const Page = () => {
  return (
    <div className="mt-16 sm:mt-24 flex flex-col w-full items-center">
      <h1 className="sm:px-8 text-orange-2 font-semibold my-12 text-center">
        General Meetings
      </h1>
      <div className="w-full overflow-x-auto px-4 scroll-snap-x snap-mandatory">
        <div className="flex space-x-6 w-max pb-4">
          {GMInfo.map((gm) => (
            <div key={gm.meeting} className="snap-start">
              <GMCard {...gm} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
