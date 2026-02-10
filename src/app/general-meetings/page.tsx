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
    slides:
      "https://www.canva.com/design/DAG_GNNqXp8/mABi6lzMRMVqHbUvqF9XiA/view?utm_content=DAG_GNNqXp8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h8906b2f519",
    date: ["Mon, Jan 26", "1/26/26", "6:30 P.M. - 8 P.M."],
  },
  {
    meeting: 2,
    slides:
      "https://drive.google.com/file/d/1wluNeZY9b5rH9Wh6VIilfLeIV6633nF1/view?usp=sharing",
    date: ["Mon, Feb 9", "2/9/26", "6:30 P.M. - 8 P.M."],
  },
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
