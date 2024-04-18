import loader from "@assets/icons/loader.svg";

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img src={loader} className="w-10 h-10" />
    </div>
  );
};

export default Loader;
