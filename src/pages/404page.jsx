import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h1 className="text-3xl font-semibold">
        Oops! {error.statusText || error.message}
      </h1>
      <p className="text-md text-gray-600">The page may be moved or removed!</p>
    </div>
  );
};

export default ErrorPage;
