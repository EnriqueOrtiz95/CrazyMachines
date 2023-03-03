import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Crazy Machines | 404</title>
        <meta name="description" content="Error 404 | Page not found" />
      </Helmet>
      <div className="h-screen flex flex-col justify-center items-center text-4xl">
        <p>Error 404 | Page not found</p>
        <Link
          to="/"
          className="mt-10 bg-orange-600 hover:bg-orange-700 py-4 px-10 rounded-full"
        >
          Go back to home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
