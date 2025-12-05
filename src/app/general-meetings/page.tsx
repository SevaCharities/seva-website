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
    date: ["Mon, Sep 8", "9/8/25", "6:30 P.M. - 8 P.M."],
  },
  {
    meeting: 2,
    slides:
      "https://drive.google.com/file/d/1MU6vDeEof5HkuPJcGRlRNIDgfi04PukG/view?usp=sharing",
    date: ["Mon, Sep 15", "9/15/25", "6:30 P.M. - 8 P.M."],
  },
  {
    meeting: 3,
    slides:
      "https://drive.google.com/file/d/1mmO5IIllhsYd4gSfdHbNuEB5rPa1JYa8/view?usp=sharing",
    date: ["Mon, Oct 6", "10/6/25", "6:30 P.M. - 8 P.M."],
  },
  {
    meeting: 4,
    slides:
      "https://drive.google.com/file/d/1Ylta4HVkhpOzK23NsmpFRSsl5JaFlX7_/view?usp=sharing",
    date: ["Mon, Oct 20", "10/20/25", "6:30 P.M. - 8 P.M."],
  },
  {
    meeting: 5,
    slides:
      "https://drive.google.com/file/d/1v5HXrU34Xz9wtPIKJer_ald3s6J-CTjA/view?usp=sharing",
    date: ["Mon, Nov 3", "11/3/25", "6:30 P.M. - 8 P.M."],
  },
  {
    meeting: 6,
    slides:
      "https://drive.google.com/file/d/1bsY6UrbVaHaRXGQJH6TfTZAWQxlZ7I-w/view?usp=sharing",
    date: ["Mon, Nov 17", "11/17/25", "6:30 P.M. - 8 P.M."],
  },
  {
    meeting: 7,
    slides:
      "https://drive.google.com/file/d/1FGtGgWlP6lJPQOZm6q3ewR2TvKVwtrbf/view?usp=sharing",
    date: ["Mon, Dec 1", "12/1/25", "6:30 P.M. - 8 P.M."],
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
