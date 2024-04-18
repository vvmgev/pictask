import { Link } from "react-router-dom";
import Button from "./button";

const Error = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
      <p className="text-3xl">Something went wrong</p>
      <p>Please Navitgate To Home Page</p>
      <Button>
        <Link to="/" replace>
          Go To Home Page
        </Link>
      </Button>
    </div>
  );
};

export default Error;
