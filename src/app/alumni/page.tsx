"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Card, { AlumniProps } from "../components/AlumniCard";
import Image from "next/image";

const alumni: AlumniProps[] = [
    {
        name: "Akhil Amin",
        email: "akhil.amin.98@gmail.com",
        gradYear: 2020,
        bio: "My name is Akhil Amin. I'm currently working as a Senior Product Manager at SpotOn in New York City and still hanging out with all my friends that I made in Seva. My favorite memory was definitely organizing the first Amazing Race with all my friends. I was on Board for two years (Events Officer and then VP of Events)",
        link: "https://www.linkedin.com/in/akhil-amin?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
        name: "Anjali Asarpota",
        email: "AnjaliAsarpota@gmail.com",
        gradYear: 2023,
        bio: "Hi, my name is Anjali! I'm currently a second year PA student at UNT Health Science Center in Fort Worth, TX. I served on Seva board as Senior Advisor, VP of Events and Philanthropy, and Philanthropy Officer! My favorite Seva memory was Lakehouse 2022 :)",
        link: "https://www.linkedin.com/in/anjali-asarpota"
    },
    {
        name: "Gurleen Singh",
        email: "gurleens1@gmail.com",
        gradYear: 2024,
        bio: "Hi! I'm Gurleen! I am currently a dental student at Texas Tech's school in El Paso. Please feel free to ask me any questions related to dental school/extracurriculars/pre-reqs/interviews and anything else! My favorite Seva memory was Senior Sendoff my first year on Board :) It was such a sweet day celebrating the most impactful seniors and we ended the whole night off with dancing in the rain on The Quarters' garage rooftop <3",
        link: "https://www.linkedin.com/in/gurleen-singh-69b441193/"
    },
    {
        name: "Jibran Cutlerywala",
        email: "jibranc@outlook.com",
        gradYear: 2025,
        bio: "Hi! I'm Jibran and I work as a Software for Hardware Engineer at Microsoft in Seattle and was the Events Officer in 2023/24. My favorite Seva memory is taking over buckshots and post-gaming on The Quarters' garage rooftop with all the alumni in 2022",
        link: "https://www.linkedin.com/in/jibranc"
    },
    {
        name: "Kishan Asokan",
        email: "kishanasokan@gmail.com",
        phone: "847-716-0508",
        gradYear: 2020,
        bio: "Hi! I'm Kishan, a MS3 at McGovern Medical School and was on the Seva board from sophomore through senior year. My favorite Seva memory has to be our board retreat to New Braunfels. The retreat was the perfect mix of bonding, laughter, and unforgettable moments.",
        link: "https://www.linkedin.com/in/kishan-asokan/"
    },
    {
        name: "Parth Dargan",
        email: "Parthdargan@gmail.com",
        gradYear: 2023,
        bio: "Hey! I'm Parth! I was on Seva board from 2020-2023 and it was the best of times. I'm currently working at Exxon in IT and applying for my MBA. Feel free to reach out for anything!",
        link: "https://www.linkedin.com/in/parth-dargan"
    },
    {
        name: "Ranjan Veludandi",
        email: "Ranjanv2000@gmail.com",
        gradYear: 2022,
        bio: "Hi! I'm Ranjan and I'm a Tech Consultant at Accenture in Houston, working on AI projects in the oil and gas industry. My favorite Seva memory has to be the Amazing Race during my freshman and senior years.",
        link: "https://www.linkedin.com/in/rveludandi/"
    },
    {
        name: "Ryan Jacob",
        email: "ryan8ntu@gmail.com",
        gradYear: 2024,
        bio: "Hi! I'm Ryan and I'm a Business Analyst at CarMax. I majored in MIS and served as both Events Officer and President in Seva. My favorite Seva memory has to be the weekend we went camping—it was such a wholesome time being out in nature and enjoying all the things we loved as kids. That same weekend, we also got featured in the halftime show for the football game against West Virginia!",
        link: "https://www.linkedin.com/in/ryanthomasjacob?trk=contact-info"
    },
    {
        name: "Shubhi Agarwal",
        email: "shubhi07@hotmail.com",
        gradYear: 2024,
        bio: "Hi! My name is Shubhi and I graduated Chemical Engineering from UT Austin in 2024! I've been working at BASF, and I'm part of their Professional Development Program (PDP) which is a 2 year rotational program where you do three different rotations in various roles & locations. My 1st rotation was in Michigan as a Production Engineer and my 2nd rotation (current) is in North Carolina as a Product Manager. Happy to chat anytime! I was a part of Seva Board, and my favorite memory was 2022 Senior Sendoff☺️ After a fun night out we danced on the top of The Quarters' Garage in the rain all night!",
        link: "https://www.linkedin.com/in/shubhi-agarwal2165/"
    },
    {
        name: "Smit Shah",
        email: "smitwars2@gmail.com",
        gradYear: 2023,
        bio: "Hi my name is Smit Shah, class of 2023. I graduated with a degree in Biochemistry and worked for a couple years in Biotech Manufacturing at Lonza. Since then, I have started nursing school working towards my RN. I was on board for Seva 6.0 and my favorite memory would be Marriage and Divorce.",
        link: "https://www.linkedin.com/in/smit-shah-6351771a6/"
    },
    {
        name: "Somya Agarwal",
        email: "somya03@hotmail.com",
        gradYear: 2019,
        bio: "Hey guys! I'm Somya, I graduated back in 2019 and now am a practicing PA (Physician Assistant) in Pediatric Orthopedics in Dallas! I was part of the first Seva chapter and on board. It's so hard to pick just one favorite Seva memory but I always loved Lakehouse shenanigans and pranking the newbies.",
        link: "https://www.linkedin.com/in/somya-a-941a7280/"
    },
];

export default function Alumni() {
    const [isMember, setIsMember] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                
                if (!session?.user?.id) {
                    setIsMember(false);
                    setLoading(false);
                    return;
                }

                const response = await fetch(`/api/member-status?userId=${session.user.id}`);
                const data = await response.json();
                setIsMember(data.is_member);
            } catch (error) {
                console.error('Error checking member status:', error);
                setIsMember(false);
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, []);
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    // Not a member - show access denied
    if (!isMember) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center px-8">
                <div className="text-center">
                    <div className="mb-8">
                        <div className="text-6xl mb-4">🔒</div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Members Only</h1>
                        <p className="text-lg text-gray-600 mb-2">
                            This page is restricted to Seva members.
                        </p>
                        <p className="text-sm text-gray-500 mb-8">
                            Contact a board member if you believe this is an error.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <a 
                            href="/profile" 
                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Go to Profile
                        </a>
                        <br />
                        <a 
                            href="/" 
                            className="inline-block text-gray-600 hover:text-gray-800 underline transition-colors"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Member - show alumni content
    const sortedAlumni = [...alumni].sort((a, b) => b.gradYear - a.gradYear);
    return (
        <div className="my-16 sm:my-24">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                    ⭐ Meet Our Alumni! 🎓
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Following their paths from graduation to success
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-8">
                {sortedAlumni
                    .map(alum => alum.gradYear)
                    .filter((year, index, arr) => arr.indexOf(year) === index)
                    .map((year, yearIndex, yearsArray) => {
                        const yearAlumni = sortedAlumni.filter(alum => alum.gradYear === year);
                        
                        return (
                            <div key={year} className="mb-8">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-lg shadow-md">
                                        Class of {year}
                                    </div>
                                    <div className="text-sm text-gray-500 ml-4">
                                        ({yearAlumni.length} alumni)
                                    </div>
                                </div>
                                
                                <div className="mb-6">
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {yearAlumni.map((alum, index) => (
                                            <div key={`${year}-${index}`} className="mb-3">
                                                <Card info={alum} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {yearIndex < yearsArray.length - 1 && (
                                    <div className="w-full h-px bg-gray-200 my-6"></div>
                                )}
                            </div>
                        );
                    })
                }
            </div>

            <div className="mt-24 bg-gradient-to-br from-gray-50 to-gray-100 py-20 rounded-3xl mx-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Where They Are Now:
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        Our alumni have found success across leading organizations
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 inline-block">
                        <Image 
                            src="/company_logos.png" 
                            alt="Companies Logos" 
                            width={800} 
                            height={400} 
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}