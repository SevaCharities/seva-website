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
      className={`flex-shrink-0 w-80 sm:w[22rem] rounded-xl shadow-lg p-6 ${GMColors[meeting]}`}
      style={{
        opacity: upcoming ? 0.75 : 1,
        height: "60vh",
        maxHeight: "720px", 
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-5xl font-bold mb-6">{`GM ${meeting}`}</h1>
          {slides && (
            <p>
              <a
                className="text-blue-700 underline"
                href={slides}
                target="_blank"
                rel="noopener noreferrer"
              >
                Slides
              </a>
            </p>
          )}
        </div>
        <div className="text-right mt-8">
          <h3 className="text-lg font-bold mb-3">{date[0]}</h3>
          <h6 className="text-sm text-gray-700 font-bold mb-3">{date[1]}</h6>
          {upcoming && <p className="text-sm font-semibold text-red-600">Upcoming</p>}
        </div>
      </div>
    </div>
  );
};
export default GMCard;
