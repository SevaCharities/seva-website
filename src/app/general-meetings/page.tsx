import GMCard from "../components/GMCard";

export type GMProps = {
  meeting: number;
  slides?: string;
  date: string[];
  upcoming?: boolean;
};

const GMInfo: GMProps[] = [
  {
    meeting: 11,
    slides:
      /*""*/,
    date: ["Mon, Mar 10", "3/10/25"],
    upcoming: true,
  },
  
  {
    meeting: 10,
    slides:
      "https://docs.google.com/presentation/d/1qZ3UvwahjH4d6cwrlEGbUXGk6urwKK8VQy4pYwJRIzA/edit?usp=sharing",
    date: ["Mon, Feb 24", "2/24/25"],
  },
  {
    meeting: 9,
    slides:
      "https://docs.google.com/presentation/d/1_c4kid8FPaguNe_LD1kBZyecRClcsvV8CWs5NHoD6Lo/edit?usp=sharing",
    date: ["Mon, Feb 10th", "2/10/25"],
  },
  {
    meeting: 8,
    slides:
      "https://docs.google.com/presentation/d/1JzN5vrMfa2PthbfUnk_56C2snJYtnHfDETfWT1f1yPI/edit?usp=sharing",
    date: ["Mon, Jan 27", "1/27/25"],
  },
  {
    meeting: 7,
    slides:
      "https://docs.google.com/presentation/d/1VCJTDNnxvyz9dzjKenWXRWqPqxCGIGwAZ56RUWSAS0A/edit?usp=sharing",
    date: ["Mon, Dec 2", "12/2/24"],
  },
  {
    meeting: 6,
    slides:
      "https://docs.google.com/presentation/d/1Jl5W-T8eBbwfeyAamLwQLeMqK8m3jyQ_ZaJjEi0tb2U/edit?usp=sharing",
    date: ["Mon, Nov 18", "10/4/24"],
  },
  {
    meeting: 5,
    slides:
      "https://docs.google.com/presentation/d/1l6MnxYuLHu3TwLY431fr8YiI_BBB-imiln9jJg-fUXc/edit?usp=sharing",
    date: ["Mon, Nov 4", "10/4/24"],
  },
  {
    meeting: 4,
    slides:
      "https://docs.google.com/presentation/d/1GJ7tTQXSvJxL00Ara-Or1E9g16eHHtuxxz1SqsxY3jk/edit?usp=sharing",
    date: ["Mon, Oct 21", "10/21/24"],
  },
  {
    meeting: 3,
    slides:
      "https://docs.google.com/presentation/d/13RXneO0RG1bRF3z8n41YPdZP58qf8-ma4_nbvVEkvmo/edit?usp=sharing",
    date: ["Mon, Oct 7", "10/7/24"],
  },
  {
    meeting: 2,
    slides:
      "https://docs.google.com/presentation/d/1hH7XfXMKU5LdNYHrjrwxvu7r0Yt4_qzX4wMshGB7NhQ/edit?usp=sharing",
    date: ["Mon, Sep 23", "9/23/24"],
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
