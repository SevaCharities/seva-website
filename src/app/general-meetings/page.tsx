import GMCard from "../components/GMCard";

export type GMProps = {
  meeting: number;
  slides?: string;
  date: string[];
  upcoming?: boolean;
};

const GMInfo: GMProps[] = [
  {
    meeting: 14,
    slides:
      "https://docs.google.com/presentation/d/1f8-M9bnhtmKREmYArgZXBVpaKn8uWmq2ZI7NOgzayyo/edit?usp=sharing",
    date: ["Mon, Apr 21", "4/21/25"],
  },
  {
    meeting: 13,
    slides:
      "https://docs.google.com/presentation/d/1JYtHfXvyl96ncV5-cOv8LPc7Fj8imBA44N5gGVDphzM/edit?usp=sharing",
    date: ["Mon, Apr 7", "4/7/25"],
  },
  {
    meeting: 12,
    slides:
      "https://file.groupme.com/v1/102302724/files/e9991882-1e36-4648-9a81-d5cf913b4363?access_token=RfAUZzHghZSJfRX1yoknHhBpcMNu44OKovGZ0CC4&omit-content-disposition=true",
    date: ["Mon, Mar 24", "3/24/25"],
  },
  {
    meeting: 11,
    slides:
      "https://file.groupme.com/v1/102302724/files/9e95836f-b35b-48d6-8453-706be46795d8?access_token=RfAUZzHghZSJfRX1yoknHhBpcMNu44OKovGZ0CC4&omit-content-disposition=true",
    date: ["Mon, Mar 10", "3/10/25"],
  },
  {
    meeting: 10,
    slides:
      "https://docs.google.com/presentation/d/1qZ3UvwahjH4d6cwrlEGbUXGk6urwKK8VQy4pYwJRIzA/edit?usp=sharing",
    date: ["Mon, Feb 24", "2/24/25"],
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
