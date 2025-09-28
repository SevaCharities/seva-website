import Image from "next/image";

// Semester configuration
const semesters = [
  // {
  //   title: "Fall 2025",
  //   folderName: "fall2025", 
  //   photoCount: 35,
  //   startIndex: 53, // Photos 53-87
  //   captions: [
  //     "Welcome Back Social",
  //     "Community Garden Volunteering",
  //     "Game Night",
  //     "Beach Cleanup",
  //     "Spring Formal",
  //     "Finals Week Care Packages",
  //   ],
  //   captionRanges: [
  //     [53, 57], // Welcome Back Social
  //     [58, 62], // Community Garden Volunteering
  //     [63, 68], // Game Night
  //     [69, 75], // Beach Cleanup
  //     [76, 82], // Spring Formal
  //     [83, 87], // Finals Week Care Packages
  //   ],
  //   getCaptionFunction: function(index: number): string {
  //     for (let i = 0; i < this.captionRanges.length; i++) {
  //       const [start, end] = this.captionRanges[i];
  //       if (index >= start && index <= end) {
  //         return this.captions[i];
  //       }
  //     }
  //     return "Event";
  //   }
  // },
  {
    title: "Spring 2025",
    folderName: "spring2025",
    photoCount: 46,
    startIndex: 48,
    captions: [
      "Marriage & Divorce",
      "Sevopoly", 
      "Ecology Action Phil",
      "Back to Y2K Party",
      "Pie or Dye",
      "Lakehouse",
      "The Amazing Race",
      "Circle Showdown",
      "Member IM Volleyball",
      "Senior Sendoff",
    ],
    captionRanges: [
      [48, 52], // Marriage & Divorce
      [53, 57], // Sevopoly
      [58, 61], // Ecology Action Phil
      [62, 66], // Back to Y2K Party
      [67, 69], // Pie or Dye
      [70, 80], // Lakehouse
      [81, 83], // The Amazing Race
      [84, 86], // Circle Showdown
      [87, 88], // Member IM Volleyball
      [89, 93], // Senior Sendoff
    ],
    getCaptionFunction: function(index: number): string {
      for (let i = 0; i < this.captionRanges.length; i++) {
        const [start, end] = this.captionRanges[i];
        if (index >= start && index <= end) {
          return this.captions[i];
        }
      }
      return "Event";
    }
  },
  {
    title: "Fall 2024",
    folderName: "fall2024",
    photoCount: 46,
    startIndex: 1, // Photos 1-46
    captions: [
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
    ],
    captionRanges: [
      [1, 4],   // Seva Olympics
      [5, 8],   // Trail Conservancy Phil
      [9, 14],  // Poker X Potluck Social
      [15, 18], // Mosaic Making Phil
      [19, 31], // Saanj
      [32, 33], // Recognize Good Award at GM
      [34, 37], // Creative Action
      [38, 41], // Pickleball x Basketball Social
      [42, 42], // Hiking Social
      [43, 46], // Boat Formal
    ],
    getCaptionFunction: function(index: number): string {
      for (let i = 0; i < this.captionRanges.length; i++) {
        const [start, end] = this.captionRanges[i];
        if (index >= start && index <= end) {
          return this.captions[i];
        }
      }
      return "Event";
    }
  }
];

export default function Photos() {
  return (
    <div className="my-16 sm:my-24">
      {/* Main Header */}
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
          Photo Gallery
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Memories from our journey together
        </p>
      </div>

      {/* Render each semester */}
      {semesters.map((semester, semesterIndex) => (
        <div key={semester.folderName} className="mb-20">
          {/* Semester Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              {semester.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
          </div>

          {/* Photo Grid - 5 columns */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array(semester.photoCount)
                .fill(0)
                .reverse()
                .map((_, i) => {
                  const photoIndex = semester.startIndex + semester.photoCount - 1 - i;
                  return (
                    <div
                      key={`${semester.folderName}-${photoIndex}`}
                      className="relative aspect-[4/3] group overflow-hidden rounded-lg"
                    >
                      {/* Image */}
                      <Image
                        src={`/photos/${photoIndex}.jpg`}
                        alt={`Event ${photoIndex}`}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL="/blur.png"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-semibold text-center px-2">
                          {semester.getCaptionFunction(photoIndex)}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}