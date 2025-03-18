import EventsCard from "../components/EventsCard";
export type EventsProps = {
    title: string;
    category: number;
    date: string[];
    description: string;
  };
  
  const EventsInfo: EventsProps[] = [
    {
      title: "Lakehouse",
      category: 1,
      date: ["Fri, Mar 28 - Sun, Mar 30", "3/28/24 - 3/30/24"],
      description: "A three-day adventure to a lakehouse in Austin! Some activities at this years house include: " +
        "lots of games, beautiful park/lake nearby, swimming, and making long-lasting friends. Invite and RSVP only.",
    },
  ];
  
  const Page = () => {
    return (
      <div className="mt-16 sm:mt-24 flex flex-col w-full justify-center items-center">
        <h1 className="sm:px-8 text-orange-2 font-semibold my-12 text-center ">
          Events
        </h1>
        <div className="bg-white w-full">
          {EventsInfo.map((event) => (
            <EventsCard key={event.title} {...event} />
          ))}
        </div>
      </div>
    );
  };
  export default Page;
