import Image from "next/image";

interface Merch {
  name: string;
  price: number;
  image: string;
}

const merch: Merch[] = [
  { name: "Seva T-shirt (Home)", price: 7, image: "/tshirt.avif" },
  { name: "Seva T-shirt (Away)", price: 8, image: "/tshirt.avif" },
  { name: "Seva T-shirt (Away)", price: 8, image: "/tshirt.avif" },
];

const MerchTile = ({ m }: { m: Merch }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg ">
      <div className="relative w-80 h-72">
        <Image
          src={m.image}
          alt={m.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="w-full flex justify-between items-center py-8 px-6">
        <h3 className="text-xl">{m.name}</h3>
        <p className=" text-orange-2 text-lg  font-semibold">${m.price}</p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="my-16 sm:my-24 flex flew-wrap flex-col justify-center items-center">
      <h1 className="px-8 text-orange-2 font-semibold my-12 text-center ">
        Merch
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {merch.map((m: Merch, index: number) => (
          <MerchTile key={index} m={m} />
        ))}
      </div>
    </div>
  );
};
export default Page;
