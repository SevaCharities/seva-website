import Card, { OfficerProps } from "../components/OfficerCard";

const officers: OfficerProps[] = [
  {
    name: "Brianna Surti",
    role: "President",
    photoVersion: "2",
    bio: "Hi!! I’m Brianna, a junior majoring in Finance and minoring in MIS, and I’ve been in Seva for three years! I love playing volleyball, baking, listening to music, and traveling (road trip or 9-hour flight, I’m there). My favorite thing about Seva is the genuine people you meet and how what we do truly makes a difference."
  },
  {
    name: "Ajitesh Valluru",
    role: "VP Events and Philanthropy",
    photoVersion: "2",
    bio: "I'm Ajitesh, and I'm a senior double majoring in Biology and Public Health, with a minor in Business. I like to play sports, hang out with friends, drink boba, and love eating food (slide the austin recs pls). My favorite thing about Seva has to be all the close friends that I've made in this past year, and hope to make more this upcoming year!"
  },
  {
    name: "Mahesh Challapalli",
    role: "VP of Engagement and Communications",
    photoVersion: "2",
    bio: "Hey guys! I’m Mahesh a senior majoring in Neuroscience and this is my third year in Seva! I love running, going on hikes, and playing sports so feel free to hit me up if you want to do something! My favorite thing about Seva is the connections I have made through this org and hope to have many more people join this family!"
  },
  {
    name: "Nithin Nandhakumar",
    role: "Philanthropy",
    bio: "Hi yall! My name is Nithin and I’ll be one of your philanthropy officers this year. I’m a junior human biology major, and this is my second semester in Seva. I love playing a bunch of different sports like Soccer, hockey, and cycling (I’m cycling to Alaska this summer). My favorite thing about Seva is the people and making a whole lot of new friends who are genuine, kind, and inspired to do good things for others."
  },
  {
    name: "Shiv Shah",
    role: "Philanthropy",
    bio: "Hey I'm Shiv, a sophomore majoring in Neuroscience and minoring in Educational Psychology. I've been with Seva for one year, and it is by far the best org i've been a part of. I love playing basketball and football, hanging out with friends, and eating absolutely everything. My favorite part about Seva is how easy it is to have a positive impact, and also how easy it is to have fun and meet new people while doing so."
  },
  {
    name: "Ria Jariwala",
    role: "Events",
    bio: "Hi! I’m Ria, a sophomore majoring in Interior Design with a minor in Business Foundations. This is my second year in Seva and I enjoy baking, traveling, watching rom-coms, and going to coffee/matcha shops with friends. My favorite things about Seva are the people and lakehouse!"
  },
  {
    name: "Umika Palli",
    role: "Events",
    bio: "Hi!! I'm Umika, and I'm a sophomore Biology major, and this is my second year in Seva! In my free time, I like to paint, play pickleball/tennis, and spend time with my friends and family. My favorite thing about Seva is the amazing friendships I made, all while making a positive impact on the community!"
  },
  {
    name: "Bhavini Patel",
    role: "Engagement",
    bio: "Hi!! I’m Bhavini, a sophomore majoring in aerospace engineering, and this is my second year in Seva! I love playing sports, watching football, and traveling. My favorite thing about Seva is the connections you make and all the memories you share with people who have the same goals as you."
  },
  {
    name: "Dhruv Srivastava",
    role: "Engagement",
    bio: "Hey y’all I’m Dhruv, a Senior Aerospace Engineering major, and I’m and Engagement Officer this year! I love photography, traveling, hiking, pretty much anything outdoors. This is my second year in Seva, and my favorite part, other than the awesome events ofc, is volunteering around Austin and making an impact."
  },
  {
    name: "Visvesh Raghuraman",
    role: "Tech",
    bio: "Hey I'm Visvesh! I'm a sophomore CS major and this is my second year in Seva. I love playing tennis, volleyball, and hanging out with friends. My favorite part about Seva is all the people I met and made friends with."
  },
  {
    name: "Sohan Mekala",
    role: "Finance",
    bio: "Hello! My name is Sohan and I'm a sophomore majoring in Finance and minoring in SDS, and I've been in Seva for two semesters now! I love 8-ball pool, gossip girl, and coffee. My favorite thing about Seva is the fun events that we host and all the people you become close with really quickly."
  },
  {
    name: "Abhi Pasam",
    role: "Membership",
    bio: "Hey! I'm Abhi, a sophomore majoring in Computer Science and I've been in Seva for a year. I like playing pickleball, ranking food spots on Beli, and going on hikes. My favorite thing about Seva is the people I've been able to meet and the fun socials."
  },
  {
    name: "Simran Shrimankar",
    role: "Membership",
    bio: "Hi, I'm Simran, a senior biochemistry major, and this is my fourth year in Seva. I am always down to play any sport, and watch too (big Cowboys fan). My favorite part about Seva is getting to hang out with the good friends I have made while also doing good."
  },
  {
    name: "Anya Vadayar",
    role: "Communications and Content Design",
    bio: "Hey, I’m Anya!! I’m a senior majoring in Sociology and minoring in Educational Psychology and Social and Behavioral Sciences, and I’m one of your C&C officers this year! I love Seva because it allowed me to meet people whom I probably wouldn't have met otherwise, and those friendships have turned into some of my closest bonds now. I also love how what we do has both a local and global impact! In my free time, I love bingeing shows, listening to music (I love The Weeknd), crafting, side-questing with friends, and trying new coffee shops."
  },
  {
    name: "Insha Ali",
    role: "Communications and Content Design",
    bio: "Hey guys!! I’m Insha, a junior majoring in Economics and minoring in Intro to Business, and I’m a C&C officer! I’ve had such an amazing time creating content for SEVA this year. I love SEVA because I’ve met so many amazing people and made friendships that have turned into such a close bond. It’s always so much fun hanging out with everyone! Outside of SEVA, I love watching TV, scrolling through TikTok, listening to sad music, and painting! I’m also a huge nerd and LOVE anime :)"
  },
  {
    name: "Nadine Alphonse",
    role: "Senior Advisor",
    photoVersion: "2",
    bio: "Hi I’m Nadine! and I’m a senior ECE major and this is my fourth year in Seva. I love listening to music, watching soccer, and hanging out with my friends! My favorite part of Seva is all the amazing people that make it feel like family while getting to volunteer and make and huge impact!"
  },
  {
    name: "Parthiv Varanasi",
    role: "Senior Advisor",
    photoVersion: "2",
    bio: "Hey! I'm Parthiv and I'm a senior double majoring in Mathematics and Economics and this is my fourth year in Seva. I love rock climbing, tennis, and pretty much anything outdoors (except camping). I listen to pretty much every genre of music and enjoy finding new artists so always feel free to put me on. My favorite thing about Seva is the incredible people I've met and of course the meaningful mission we work towards."
  },
  {
    name: "Saahiti Chadalavada",
    role: "Senior Advisor",
    photoVersion: "2",
    bio: "Heyy! I'm Saahiti and I am a senior finance student! This is my fourth year in Seva and my favorite part about Seva is building relationships while making an impact on the community. Some of my hobbies are watching sports and eating good food, so let me know some good recs!"
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