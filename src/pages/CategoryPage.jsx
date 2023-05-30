import { Link } from "react-router-dom";
import Error from "../components/Error";
import NotFound from "../components/NotFound";
import RowCardSkelton from "../components/skelton/RowCardSkelton";
import { useGetCategoriesQuery } from "../features/category/categoryApi";

export default function CategoryPage() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery();

  // content to be displayed
  const content = isLoading ? (
    <>
      {" "}
      <RowCardSkelton />
      <RowCardSkelton />
      <RowCardSkelton />
      <RowCardSkelton />
    </>
  ) : isError ? (
    <div>{error?.data}</div>
  ) : (
    categories?.map((category) => {
      const { name, id } = category;

      const url = name.replace(/\s+/g, "-").toLowerCase();

      return (
        <Link
          key={category.id}
          to={`/${url}_${btoa(id)}`}
          state={{ id: category.id }}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
        >
          <img
            className="object-cover rounded-t-lg h-auto w-1/2 md:rounded-none md:rounded-l-lg"
            src={category.image && category.image}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
              {category.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              Here are the biggest enterprise technology acquisitions of 2021
            </p>
          </div>
        </Link>
      );
    })
  );

  return (
    <>
      <div className="bg-slate-100">
        <div className="container mx-auto px-4 py-10">
          {/* Loading... */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              <RowCardSkelton />
              <RowCardSkelton />
              <RowCardSkelton />
              <RowCardSkelton />
              <RowCardSkelton />
              <RowCardSkelton />
              <RowCardSkelton />
              <RowCardSkelton />
            </div>
          )}

          {/* Error */}
          {isError && <Error message={error?.data} />}

          {/* Not Found */}
          {!isLoading && !isError && categories?.length === 0 && <NotFound />}

          {/* Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {!isLoading &&
              !isError &&
              categories?.length > 0 &&
              categories?.map((category) => {
                const { name, id } = category;

                const url = name.replace(/\s+/g, "-").toLowerCase();

                return (
                  <Link
                    key={category.id}
                    to={`/${url}_${btoa(id)}`}
                    state={{ id: category.id }}
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
                  >
                    <img
                      className="object-cover rounded-t-lg h-auto w-1/2 md:rounded-none md:rounded-l-lg"
                      src={category.image && category.image}
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
                        {category.name}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700">
                        Here are the biggest enterprise technology acquisitions
                        of 2021
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
