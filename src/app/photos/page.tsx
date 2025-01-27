import Image from "next/image";

const captions = [
  "Seva Olympics",
  "Trail Conservancy Phil",
  "Poker X Potluck Social",
  "Mosaic Making Phil",
  "Saanj",
  "Recognize Good Award at GM",
  "Creative Action",
  "Pickleball x Basketball Social",
  "Hiking Social",
  "Boat Formal",
];

export default function Photos() {
  function getCaption(index: number): string {
    if (index <= 4) {
      return captions[0];
    } else if (index <= 8) {
      return captions[1];
    } else if (index <= 14) {
      return captions[2];
    } else if (index <= 18) {
      return captions[3];
    } else if (index <= 31) {
      return captions[4];
    } else if (index <= 33) {
      return captions[5];
    } else if (index <= 37) {
      return captions[6];
    } else if (index <= 41) {
      return captions[7];
    } else if (index <= 42) {
      return captions[8];
    } else {
      return captions[9];
    }
  }

  return (
    <div className="my-16 sm:my-24 flex flex-wrap flex-col justify-center items-center">
      <div className="flex flex-wrap justify-center gap-2">
        {Array(46)
          .fill(0)
          .map((_, i) => (
            <div
              key={i + 1}
              className="relative w-96 h-64 group overflow-hidden"
            >
              {/* Image */}
              <Image
                src={`/photos/${i + 1}.jpg`}
                alt={`Event ${i + 1}`}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL="/blur.png"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {getCaption(i + 1)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
