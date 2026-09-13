import Card, { OfficerProps } from "../components/OfficerCard";

const officers: OfficerProps[] = [
  {
    name: "Brianna Surti",
    role: "President",
    photoVersion: "2",
    bio: ""
  },
  {
    name: "Ajitesh Valluru",
    role: "VP Events and Philanthropy",
    photoVersion: "2",
    bio: ""
  },
  {
    name: "Mahesh Challapalli",
    role: "VP of Engagement and Communications",
    photoVersion: "2",
    bio: ""
  },
  {
    name: "Nithin Nandhakumar",
    role: "Philanthropy",
    bio: ""
  },
  {
    name: "Shiv Shah",
    role: "Philanthropy",
    bio: ""
  },
  {
    name: "Ria Jariwala",
    role: "Events",
    bio: ""
  },
  {
    name: "Umika Palli",
    role: "Events",
    bio: ""
  },
  {
    name: "Bhavini Patel",
    role: "Engagement",
    bio: ""
  },
  {
    name: "Dhruv Srivastava",
    role: "Engagement",
    bio: ""
  },
  {
    name: "Visvesh Raghuraman",
    role: "Tech",
    bio: ""
  },
  {
    name: "Sohan Mekala",
    role: "Finance",
    bio: ""
  },
  {
    name: "Abhi Pasam",
    role: "Membership",
    bio: ""
  },
  {
    name: "Simran Shrimankar",
    role: "Membership",
    bio: ""
  },
  {
    name: "Anya Vadayar",
    role: "Communications and Content Design",
    bio: ""
  },
  {
    name: "Insha Ali",
    role: "Communications and Content Design",
    bio: ""
  },
  {
    name: "Nadine Alphonse",
    role: "Senior Advisor",
    photoVersion: "2",
    bio: ""
  },
  {
    name: "Parthiv Varanasi",
    role: "Senior Advisor",
    photoVersion: "2",
    bio: ""
  },
  {
    name: "Saahiti Chadalavada",
    role: "Senior Advisor",
    photoVersion: "2",
    bio: ""
  },
];

export default function Officers() {
  return (
    <div className="my-16 sm:my-24 flex flew-wrap flex-col justify-center items-center">
      <h1 className="px-8 text-orange-2 font-semibold my-12 text-center ">
        Meet The Officers
      </h1>
      <div className="w-full max-w-4xl px-8 mb-16">
        <div className="relative w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
          <img 
            src="/group_photo_26-27.JPG" 
            alt="Seva Officers Group Photo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="px-8 lg:px-16  flex flex-wrap gap-4 justify-center">
        {officers.map((officer, index) => (
          <Card key={index} info={officer} />
        ))}
      </div>
    </div>
  );
}