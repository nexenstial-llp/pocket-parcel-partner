import { Link } from "@tanstack/react-router";
import { BsArrowLeft } from "react-icons/bs";
import PageLayout from "./PageLayout";
const NotFound = () => {
  return (
    <PageLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-max mx-auto text-center">
          <div className="sm:flex flex-col items-center justify-center">
            <div className=" ">
              <p className="text-4xl font-bold text-indigo-600 sm:text-6xl">
                404
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-12">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Page not found
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn&#39;t find the page you&#39;re looking for.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              to="/home"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <BsArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
