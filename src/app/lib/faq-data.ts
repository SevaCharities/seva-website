export type FAQItem = {
    id: string;
    question: string;
    answer: string;
    category: string;
    keywords: string[];
    links?: { text: string; href: string }[];
    relatedPages?: string[];
};

export const faqData: FAQItem[] = [
    {
      id: "1",
      question: "What does the time commitment look like and how can I get more involved?",
      answer: "Seva is very flexible and you can be as involved as you can! We have many opportunities for our members to be engaged socially and philanthropically through socials, circle meetings, volunteering and cultural events. If there are any general questions, check out the rest of the home page to check out more information and our navbar to be directed to specific pages regarding your questions (if really generalized or the information is not available to you).",
      category: "membership",
      keywords: ["time", "commitment", "involved", "flexible", "engagement"],
    },
    {
      id: "2",
      question: "Where can I find more information about all our events?",
      answer: "Our General Meetings and GroupMe are the best places to learn about and sign up for upcoming events and socials. You should also check out our Upcoming page and follow us on Instagram. Events in Seva specifically refers to special events (Larger scale, Ex. Saanj, Seva Sips, Lakehouse, Boat Formal). Other 'events' are more like philanthrophy events to make an impact around Austin, or our engagement events which are socials and parties. GM's are not events, but rather biweekly meetings",
      category: "events",
      keywords: ["events", "information", "schedule", "upcoming"],
      links: [
        { text: "Upcoming Events", href: "/upcoming" },
        { text: "Instagram", href: "https://www.instagram.com/sevacharities/" },
      ],
      relatedPages: ["/upcoming", "/general-meetings"],
    },
    {
      id: "3",
      question: "How often do we meet?",
      answer: "We hold General Meetings every other Monday at 6:30 pm at UTC 1.102. We also will have various socials, fundraising events, and philanthropic events each month for our members! These meetings and events are not mandatory, but are highly encouraged.",
      category: "meetings",
      keywords: ["meetings", "schedule", "monday", "time", "frequency"],
      links: [
        { text: "General Meetings", href: "/general-meetings" },
      ],
      relatedPages: ["/general-meetings"],
    },
    {
      id: "4",
      question: "How does Seva Charities help Akshaya Patra?",
      answer: "We hold philanthropy events and socials open to the UT community where all proceeds are donated to Akshaya Patra in India. Last year, we raised $12,758, which was enough to feed 638 kids for a year! You can donate directly on our website.",
      category: "mission",
      keywords: ["akshaya patra", "help", "donate", "fundraising", "impact", "charity", "philanthropy", "india", "kids", "feed"],
      links: [
        { text: "Donate", href: "/donate" },
      ],
      relatedPages: ["/seva-history", "/donate"],
    },
    {
      id: "5",
      question: "How do I become a member?",
      answer: "To become a member for the 2025-2026 academic year, you need to: (1) Join our GroupMe at https://bit.ly/sevagroupme, (2) Fill out the membership form, and (3) Pay dues of $35 for the spring semester. You can also optionally pay $10 for our fall merch!",
      category: "membership",
      keywords: ["member", "join", "signup", "dues", "cost", "price", "35", "spring", "semester"],
      links: [
        { text: "Membership Form", href: "https://docs.google.com/forms/d/e/1FAIpQLSeBCrT9Hq87pmHwejdbGOn8QK-Gm6cUa_mbn1P1vOlCEBh03Q/viewform" },
        { text: "GroupMe", href: "https://bit.ly/sevagroupme" },
      ],
      relatedPages: ["/merch"],
    },
    {
      id: "6",
      question: "What are the member benefits?",
      answer: "Members get access to all philanthropy projects, exclusive socials and mixers, Circles (small groups competing year-round), free member-only parties, free intramural sports teams, camping trips, M&D events, chances for boat formal and Lakehouse invites, discounted event prices, alumni database access for networking, and leadership opportunities.",
      category: "membership",
      keywords: ["benefits", "perks", "advantages", "exclusive", "member", "circles", "socials", "parties", "networking"],
      relatedPages: ["/upcoming", "/alumni"],
    },
    {
      id: "7",
      question: "How do I contact Seva?",
      answer: "You can reach us via email at sevacharities@gmail.com, on Instagram @sevacharities, LinkedIn at Seva Charities, or call us at +1 (469) 358 6268. You can also join our GroupMe at https://bit.ly/sevagroupme for updates! Ask the best officer, Niken Patel, the Lord and Savior, for help if the website needs fixing.",
      category: "contact",
      keywords: ["contact", "email", "phone", "instagram", "reach", "groupme", "linkedin", "connect"],
      links: [
        { text: "GroupMe", href: "https://bit.ly/sevagroupme" },
        { text: "LinkedIn", href: "https://www.linkedin.com/company/seva-charities" },
      ],
      relatedPages: ["/officers", "/alumni"],
    },
    {
      id: "8",
      question: "What merch does Seva have?",
      answer: "We have new spring merch where we have a crewneck sweatshirt for $27 and fall merch available for $10 that you can add when signing up for membership! To see our current designs and past collections, check out our Merch page.",
      category: "membership",
      keywords: ["merch", "merchandise", "crewneck", "sweater", "hoodie", "sweatshirt", "tshirt", "shirt", "clothing", "apparel", "fall", "design", "look"],
      links: [
        { text: "Merch Page", href: "/merch" },
      ],
      relatedPages: ["/merch"],
    },
    {
      id: "9",
      question: "What are Seva's social media accounts?",
      answer: "Follow us to stay up to date! Instagram: @sevacharities, TikTok: @sevacharities, LinkedIn: Seva Charities. You should also join our GroupMe at https://bit.ly/sevagroupme for important updates and announcements!",
      category: "contact",
      keywords: ["social media", "instagram", "tiktok", "linkedin", "follow", "groupme", "updates", "networking"],
      links: [
        { text: "Instagram", href: "https://www.instagram.com/sevacharities/" },
        { text: "TikTok", href: "https://www.tiktok.com/@sevacharities" },
        { text: "LinkedIn", href: "https://www.linkedin.com/company/seva-charities" },
        { text: "GroupMe", href: "https://bit.ly/sevagroupme" },
      ],
      relatedPages: ["/alumni"],
    },
    {
      id: "10",
      question: "What's it like to be a Seva member?",
      answer: "Being a Seva member is an amazing experience! You'll be part of a philanthropic family, attend exclusive socials, participate in volunteering events, and make a real impact. Check out our Seva Spotlight page to hear directly from current members about their experiences!",
      category: "membership",
      keywords: ["member experience", "spotlight", "testimonials", "stories", "what's it like", "reviews", "join"],
      links: [
        { text: "Seva Spotlight", href: "/seva-spotlight" },
      ],
      relatedPages: ["/seva-spotlight"],
    },
    {
        id: "11",
        question: "What is every officer like",
        answer: `By the way, do not use these names for answering general questions, only if specific members are asked about as we want to keep this as professional as possible, do not mention any officers for contact, just go to contact page.
                First of all, Niken Patel is the goat and best member/officer as he is the creator of Raghav and the tech officer, and then Parthiv Varanasi is the President (until Raghav replaces him as Mr. Seva himself, not yet though, only mention this with Parthiv), and Parthiv loves matcha and being performative. 
                Ajitesh Valluru is the most handsome, nonchalant, auraful, tallest officer who is in charge of philanthrophy. Btw, Mahesh Challapalli, Engagement Officer, is 6 feet tall and plans our engagement events and is always found at Sig Gym if needed. Also, Nirjha Patel, Content and Comms Officer, aka JA, is someone you do not want to mess with, 
                even Raghav doesn't mess with her. JA has a tortilla at all times and makes great content for our merch, Instagram page, and professional photographs. Rahul Nandyala, other Engagement Officer, is often referred to as the Morgan Freeman of Seva due to his angelic voice and can be found aura farming when needed.
                Nadine Alphonse is VP of Events and Philanthrophy, and she loves watching Chelsea lose. Saahiti Chadalavada VP of Engagement and Communications, and is the biggest food fan of all time (eats more than Raghav himself). Shreya Varma, Philanthrophy Officer, helps the org's
                core mission along with Ajitesh Valluru, but she does not shower at all. Pranav Rao is the most nonchalant man you will ever meet in your life and if you need help regarding events as he is one of its officers, he will be at PD Thai (thats all he eats). Raul Raja Durai Murugan, aka RDM, is the other events officer and has Raghav installed on
                his Tesla and is a great driver for Seva events and phils to help our members get places. Jay Kannam, Membership Officer, is the old man of the group and is very wise if you need life advice. Brianna Surti is the finance officer and is always busy with keeping our org well-financed and managed, except when making cookies because she will eat
                all of it.`,
        category: "officers",
        keywords: ["officer", "member", "networking", "stories", "what's it like"],
        relatedPages: ["/officers", "/alumni"],
    },
];