import GMCard from "../components/GMCard";

export type GMProps = {
  meeting: number;
  slides?: string;
  date: string[];
  upcoming?: boolean;
};

export const GMColors = ["", "bg-green-200", "bg-indigo-200"];

const GMInfo: GMProps[] = [
  {
    meeting: 2,
    // slides:
    //   "https://docs.google.com/presentation/d/1jJyesowDqbQcwByQa1eBaTjWTaCuEVVkXL2cgZRydNM/edit?usp=sharing",
    date: ["Mon, Sep 23", "9/23/24"],
    upcoming: true,
  },
  {
    meeting: 1,
    slides:
      "https://docs.google.com/presentation/d/1jJyesowDqbQcwByQa1eBaTjWTaCuEVVkXL2cgZRydNM/edit?usp=sharing",
    date: ["Mon, Sep 9", "9/9/24"],
  },
];

const Page = () => {
  return (
    <div className="mt-16 sm:mt-24 flex flex-col w-full justify-center items-center">
      <h1 className="sm:px-8 text-orange-2 font-semibold my-12 text-center ">
        General Meetings
      </h1>
      <div className="bg-white w-full">
        {GMInfo.map((gm) => (
          <GMCard key={gm.meeting} {...gm} />
        ))}
      </div>
    </div>
  );
};
export default Page;
