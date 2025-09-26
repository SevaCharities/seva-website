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
      "https://drive.google.com/file/d/1soNjKDeO8axkHtg5p5jEFrYP81kSpBl-/view?usp=sharing",
    date: ["Mon, Sep 8", "9/8/25", "6:30 P.M."],
  },
  {
    meeting: 2,
    slides:
    "https://drive.google.com/file/d/1MU6vDeEof5HkuPJcGRlRNIDgfi04PukG/view?usp=sharing",
    date: ["Mon, Sep 15", "9/15/25", "6:30 P.M."],
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
