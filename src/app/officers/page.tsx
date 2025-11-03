import Card, { OfficerProps } from "../components/OfficerCard";

const officers: OfficerProps[] = [
  {
    name: "Parthiv Varanasi",
    role: "President",
    bio: "Hey! I'm Parthiv and I'm a junior double majoring in Mathematics and Economics and this is my third year in Seva. I love rock climbing, tennis, and pretty much anything outdoors (except camping). I listen to pretty much every genre of music and enjoy finding new artists so always feel free to put me on. My favorite thing about Seva is the incredible people I've met and of course the meaningful mission we work towards.",
  },
  {
    name: "Nadine Alphonse",
    role: "VP Events and Philanthropy",
    bio: "Hi I'm Nadine! I'm a junior ECE major and this is my third year in Seva. I love listening to music, watching soccer, and going on walks with my friends! My favorite part of Seva is being with so many amazing people and doing fun volunteer work!",
  },
  {
    name: "Saahiti Chadalavada",
    role: "VP of Engagement and Communications",
    bio: "Heyy! I'm Saahiti and I am a junior finance student as well as one of the engagement officers. This is my third year in Seva and my favorite part about Seva is building relationships while making an impact on the community. Some of my hobbies are watching sports and eating good food, so let me know some good recs!",
  },
  {
    name: "Ajitesh Valluru",
    role: "Philanthropy",
    bio: "I'm Ajitesh, and I'm a junior double majoring in Biology and Public Health, with a minor in Business. I like to play sports, hang out with friends, drink boba, and love eating food (slide the austin recs pls). My favorite thing about Seva has to be all the close friends that I've made in this past year, and hope to make more this upcoming year!",
  },
  {
    name: "Shreya Varma",
    role: "Philanthropy",
    bio: "Hi! I’m Shreya, a junior Computer Science major with a minor in Statistics & Data Science. When I’m not glued to my laptop, you’ll find me hiking, paddle boarding, sewing, or hanging out with my dog, Mushu. My favorite thing about Seva is that it gives me a way to give back while connecting with a community that feels like family <3",
  },
  {
    name: "Pranav Rao",
    role: "Events",
    bio: "Hey I'm Pranav! I am a junior Statistics and Data Science major, and this is my second year in Seva. During my free time, I love playing all types of sports, and I am a big OKC Thunder and tennis fan. I also love listening to music, driving, and doing pretty much anything outdoors. My favorite part of Seva is being able to contribute to a meaningful cause with an amazing group of people.",
  },
  {
    name: "Rahul Raja",
    role: "Events",
    bio: "Hey, I'm Rahul! I'm a senior Biomedical Engineering major + Data Science minor, and this is my second year in Seva. I love playing volleyball, football and tennis (or pretty much any intramural sport) as well as electric guitar. In another life, I'd be a taxi driver just because of how much I love to drive and talk to new people. My favorite thing about Seva is finding a family that shares my interests in service and my culture.",
  },
  {
    name: "Mahesh Challapalli",
    role: "Engagement",
    bio: "Hey guys! I’m Mahesh a Junior majoring in Neuroscience and this is my second year in Seva! I love running, going on hikes, and playing sports so feel free to hit me up if you want to do something! My favorite thing about Seva is the connections I have made through this org and hope to have many more people join this family!",
  },
  {
    name: "Rahul Nandyala",
    role: "Engagement",
    bio: "Hey there! I'm Rahul and I'm a senior studying Economics and Business. This is my second year in Seva. I love water sports, playing guitar, spicy food, and Instagram reels. My favorite thing about Seva is how welcoming everyone is to new members. There’s zero superiority complex, and I was able to get to know everyone in the org in less than a month.",
  },
  {
    name: "Niken Patel",
    role: "Tech",
    bio: "Hey I'm Niken! I'm a sophomore double majoring in Computer Science and Math + Econ minor and this is my second year in Seva. I play basketball (big Nuggets fan) and tennis in my free time. I also enjoy matcha, coffee, and good music during my free time (would love some recs). I joined Seva because it is so welcoming toward all its members out of pure dedication to serve others.",
  },
  {
    name: "Brianna Surti",
    role: "Finance",
    bio: "Hi!! I’m Brianna, a sophomore majoring in Finance and minoring in MIS, and I’ve been in Seva for two years! I love playing volleyball, baking, listening to music, and traveling (road trip or 9-hour flight, I’m there). My favorite thing about Seva is the genuine people you meet and how what we do truly makes a difference.",
  },
  {
    name: "Jay Kannam",
    role: "Membership",
    bio: "Hi! I'm Jay and I'm a senior majoring in Electrical and Computer Engineering and this is my second year in Seva. I enjoy baking and being outdoors. My favorite thing about Seva has been the community and the all the people I have met through this org.",
  },
  {
    name: "Nirjha Patel",
    role: "Communications and Content Design",
    bio: "Hi I'm Nirjha! I'm a sophomore majoring in Human Biology with a Pre-Health Certificate, and this will be my second year in Seva. I enjoy painting, listening to music, and beach days with my friends. My favorite part about Seva is how it combines meeting amazing new people and working towards a meaningful cause.",
  },
  {
    name: "Diya Ballal",
    role: "Senior Advisor",
    bio: "Hey everyone! I'm Diya and I'm a senior neuroscience major minoring in social and behavioral sciences!! I have been in Seva for four years now and it has truly been one of the most meaningful experiences of my college journey. I am so thankful for not only the inspiring people and memories I have made along the way but also our impact on the global community. In my free time, I enjoy concerts, traveling, photography and exploring new matcha spots around Austin :)",
  },
  {
    name: "Anvita Bhatt",
    role: "Senior Advisor",
    bio: "Hey I'm Anvita, a senior majoring in neuroscience, and this is my fourth year in Seva! Some of my hobbies include art, dance, and listening to music. The thing I love the most about being in Seva is being able to meet new friends and make amazing memories with them!",
  },
  {
    name: "Sarvesh Raghuraman",
    role: "Senior Advisor",
    bio: "Hey I'm Sarvesh, and I'm pursuing a PHD in ECE. I enjoy being active and especially doing outdoorsy stuff so I'm always down to go swimming, hiking etc. I also enjoy volunteering and giving back to the community a lot - which is why I joined the org :)",
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
            src="/group_photo.JPG" 
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