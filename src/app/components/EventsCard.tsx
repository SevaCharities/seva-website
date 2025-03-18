import { EventsProps } from "../events/page";

const EventsColors = [
    "",
    "bg-blue-200",
    "bg-green-200",
    "bg-red-200",
    "bg-yellow-200",
    "bg-indigo-400",
];
const categories = [
    "",
    "Social",
    "Circle Social",
    "Philantrophy",
    "IM Game",
];

const EventsCard = ({ title, category, date, description }: EventsProps) => {
    const categoryName = categories[category];
    return (
      <div
        className={`flex justify-between bg-pink    h-52  p-8 ${EventsColors[category]} `}
        style={{ opacity: description ? 0.75 : 1 }}
      >
        <div className=" flex flex-col justify-between h-full ">
          <h1 className="text-6xl">{title}</h1>
          <p className="text-md">{categoryName}</p>
        {description && (
          <p className="text-sm">{description}</p>
        )}
        </div>
        <div className="text-right">
          <h3>{date[0]}</h3>
          <h6>{date[1]}</h6>
        </div>
      </div>
    );
  };
  export default EventsCard;
