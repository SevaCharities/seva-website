import Calendar from "../components/Calendar";

const Page = () => {
  return (
    <div className="my-16 sm:my-24 flex flew-wrap flex-col justify-center items-center">
      <h1 className="px-8 text-orange-2 font-semibold my-12 text-center ">
        Calendar
      </h1>
      <Calendar/>
    </div>
  );
};
export default Page;
