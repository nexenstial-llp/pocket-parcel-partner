/* eslint-disable react/prop-types */
import { LuRefreshCw } from "react-icons/lu";
import { Link } from "@tanstack/react-router";
import PageLayout from "./PageLayout";
const ErrorPage = ({ error }) => {
  return (
    <PageLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-max mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="sm:border-r sm:border-gray-200 ">
              <div className="flex justify-center">
                <LuRefreshCw className="h-12 w-12 text-red-500 animate-spin" />
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-12">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Something went wrong
              </h1>
              <p className="mt-2 text-base text-gray-500">
                {error?.message ||
                  error?.error ||
                  "An unexpected error occurred"}
                . Please try again later.
              </p>
            </div>
          </div>
          <div className="mt-8 space-x-4">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ErrorPage;
