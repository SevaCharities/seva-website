import Card, { OfficerProps } from "../components/Card";

const officers: OfficerProps[] = [
  {
    name: "Diya Ballal",
    role: "President",
    bio: "Hey everyone! I'm Diya and I'm a third year neuroscience major minoring in social and behavioral sciences!! I have been in Seva for three years now and it has truly been one of the most meaningful experiences of my college journey. I am so thankful for not only the inspiring people and memories I have made along the way but also our impact on the global community. In my free time, I enjoy concerts, traveling, photography and exploring new matcha spots around Austin :)",
  },

  {
    name: "Anvita Bhatt",
    role: "VP Events and Philanthropy",
    bio: "Hey I'm Anvita, a junior majoring in neuroscience, and this is my third year in Seva! Some of my hobbies include art, dance, and listening to music. The thing I love the most about being in Seva is being able to meet new friends and make amazing memories with them!",
  },
  {
    name: "Sarvesh Raghuraman",
    role: "VP of Engagement and Communications",
    bio: "Hey I'm Sarvesh, the Vice President for Engagement and Comms/Content. I'm a Senior in Computer Science and Math but I don't really like the coding part... I enjoy being active and especially doing outdoorsy stuff so I'm always down to go swimming, hiking etc. I also enjoy volunteering and giving back to the community a lot - which is why I joined the org :)",
  },

  {
    name: "Nadine Alphonse",
    role: "Philanthropy",
    bio: "Hi I'm Nadine! I'm a sophomore ECE major and this is my second year in Seva. I love listening to music, watching soccer, and going on walks with my friends! My favorite part of Seva is being with so many amazing people and doing fun volunteer work!",
  },
  {
    name: "Soorya Nitianandaradj",
    role: "Philanthropy",
    bio: "I'm Soorya Nitianandaradj, a junior Finance major and one of the Phil officers. I have an interest in cooking that keeps my meals predictable. Fun fact: I'm allergic to cacti.",
  },
  {
    name: "Yamini Shekhar",
    role: "Events",
    bio: "Hi!! I'm Yamini, I am a sophomore early childhood education major and this is my second year in seva!! I love watching tv, listening to music, cooking, and playing football and volleyball. My favorite thing about being in Seva is being apart of this amazing community and all of the fun volunteering work we do! :)",
  },
  {
    name: "Krish Devnani",
    role: "Events",
    bio: "Hey I’m Krish! I’m a senior studying Informatics and I’m one of the Events officers. During my free time, I love playing badminton, soccer, and volleyball. My favorite thing about Seva is being part of a tight-knit community while also being able to contribute to a meaningful cause.",
  },
  {
    name: "Saahiti Chadalavada",
    role: "Engagement",
    bio: "Heyy! I'm Saahiti and I am a sophomore finance student as well as one of the engagement officers. This is my second year in SEVA and my favorite part about SEVA is building relationships while making an impact on the community. Some of my hobbies are watching sports and eating good food, so let me know some good recs!",
  },
  {
    name: "Arushi Arora",
    role: "Engagement",
    bio: "I’m a third year Psychology major on the pre med track! I love Taco Bell and chipotle and in my free time I’m hanging out with my friends or cooking!",
  },
  {
    name: "Shiva Balathandayuthapani",
    role: "Tech",
    bio: "Hey I'm Shiva! I'm a junior Computer Science major. I love watching NBA and soccer in my free time. I've met so many amazing friends at Seva and made fun memories!",
  },
  {
    name: "Saharsh Tummalapelly",
    role: "Finance",
    bio: "I'm Saharsh, a third-year finance major, and it's my second year in Seva. I love staying active by playing volleyball, and I'm a big fan of the Portland Trail Blazers, Real Madrid, and Texas football. When I'm not busy with school, I enjoy listening to music and catching up on good shows.",
  },
  {
    name: "Parthiv Varanasi",
    role: "Membership",
    bio: "Hey! I'm Parthiv and I'm a sophomore double majoring in Mathematics and Economics and this is my second year in Seva. I love rock climbing, tennis, and pretty much anything outdoors (except camping). I listen to pretty much every genre of music and enjoy finding new artists so always feel free to put me on. My favorite thing about Seva is the incredible people I've met and of course the meaningful mission we work towards.",
  },

  {
    name: "Sage Kaur",
    role: "Content Design",
    bio: "hi! i'm sage and this is my second year in seva charities. i am a second year environmental science major on the geology track. i enjoy listening to music, hanging out with friends, and watching gilmore girls!",
  },

  {
    name: "Tarini Vanaparthy",
    role: "Communications",
    bio: "Hey! I'm Tarini, a sophomore finance major and the comms officer! This is my second year in SEVA. I love long walks outside, books, and classic movies. You can probably always find me talking to someone or trying to find something new to do. My favorite thing about SEVA is the community and the work we do in the area.",
  },
  {
    name: "Sneha Kamal",
    role: "Senior Advisor",
    bio: "Hello, I am Sneha! I’m currently doing my masters at SMU and graduated from UT last year. I love to read, draw, binge housewives, and brain rot.",
  },

  {
    name: "Kenisha Vora",
    role: "Senior Advisor",
    bio: "hi there, i’m kenisha and am currently a senior bio major! growing up as one of the few indians in the rio grande valley, i devour anything spicy and speak hindi, gujarati, and spanish as well! also, i love the outdoors and am constantly hiking, rafting, and/or eating by a scenic backdrop (which austin is perfect for!)",
  },
];

export default function Officers() {
  return (
    <div className="my-16 sm:my-24 flex flew-wrap flex-col justify-center items-center">
      <h1 className="px-8 text-orange-2 font-semibold my-12 text-center ">
        Meet The Officers
      </h1>
      <div className="px-8 lg:px-16  flex flex-wrap gap-4 justify-center">
        {officers.map((officer, index) => (
          <Card key={index} info={officer} />
        ))}
      </div>
    </div>
  );
}
