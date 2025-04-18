import Image from "next/image";
import { MerchTile } from "../components/MerchTile";

export interface Merch {
  id: number;
  name: string;
  price: number;
  image: string[];
}

const merch: Merch[] = [
  {
    id: 1,
    name: "Seva Sweatshirt Spring 2025",
    price: 30,
    image: ["/merch/seva3_front.png"],
  },
  {
    id: 2,
    name: "Seva Sweatpants Spring 2025",
    price: 24,
    image: ["/merch/seva4_front.png"],
  },
  {
    id: 3,
    name: "Laptop Stickers 2025",
    price: 2,
    image: ["/merch/seva5_front.png"],
  },
  {
    id: 4,
    name: "Seva T-shirt 2023 (Beige)",
    price: 7,
    image: ["/merch/seva1_front.png", "/merch/seva1_back.png"],
  },
  {
    id: 5,
    name: "Seva T-shirt 2022 (Blue)",
    price: 8,
    image: ["/merch/seva2_front.png"],
  },
  

];

const Page = () => {
  return (
    <div className="my-16 sm:my-24 flex flew-wrap flex-col justify-center items-center">
      <div className="my-12">
        <h1 className="px-8 text-orange-2 font-semibold  text-center ">
          Merch
        </h1>
        <p>
          Interested in buying? Fill out this{" "}
          <a
            className=" bg-orange-2 text-white underline p-1"
            href="https://forms.gle/8GYRLvd8cdJs6CRu6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Form!
            
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {merch.map((m: Merch, index: number) => (
     <MerchTile key={index} m={m} />
        ))}
      </div>
    </div>
  );
};
export default Page;
