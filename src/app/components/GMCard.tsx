import { GMProps } from "../general-meetings/page";

const GMColors = [
  "",
  "bg-green-200",
  "bg-indigo-200",
  "bg-cyan-200",
  "bg-yellow-200",
  "bg-pink-400",
  "bg-orange-200",
  "bg-teal-200",
  "bg-lime-300",
  "bg-red-400",
  "bg-orange-400",
  "bg-emerald-400",
  "bg-blue-400",
  "bg-fuchsia-400",
  "bg-green-400"
];

const GMCard = ({ meeting, slides, date, upcoming }: GMProps) => {
  return (
    <div
      className={`flex justify-between bg-pink    h-52  p-8 ${GMColors[meeting]} `}
      style={{ opacity: upcoming ? 0.75 : 1 }}
    >
      <div className=" flex flex-col justify-between h-full ">
        <h1 className="text-6xl">{`GM ${meeting}`}</h1>
        <div>
          {slides && (
            <p>
              <a
                className=" text-blue-600 underline"
                href={slides}
                target="blank"
              >
                slides
              </a>
            </p>
          )}
        </div>{" "}
      </div>
      <div className="text-right">
        <h3>{date[0]}</h3>
        <h6>{date[1]}</h6>
        <p>{upcoming && "upcoming"}</p>
      </div>
    </div>
  );
};
export default GMCard;
