import GMCard from "../components/GMCard";

export type GMProps = {
  meeting: number;
  newsletter: boolean;
  slides: boolean;
  date: string[];
  upcoming?: boolean;
};

// { meeting: 1, newsletter: true, slides: true }
const GMInfo: GMProps[] = [
  {
    meeting: 1,
    newsletter: false,
    slides: false,
    date: ["Mon, Sep 9", "9/9/24"],
    upcoming: true,
  },
];

const Page = () => {
  return (
    <div className="my-16 sm:my-24 flex flew-wrap flex-col justify-center items-center">
      <h1 className="px-8 text-orange-2 font-semibold my-12 text-center ">
        General Meetings
      </h1>
      <div className="bg-white w-full min-h-96">
        {GMInfo.map((gm) => (
          <GMCard key={gm.meeting} {...gm} />
        ))}
      </div>
    </div>
  );
};
export default Page;
