import CategoryCard from "../../components/CategoryCard";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import RowCardSkelton from "../../components/skelton/RowCardSkelton";
import { useGetCategoriesQuery } from "../../features/category/categoryApi";

export default function CategoryPage() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();

  const categories = data?.payload || [];

  return (
    <>
      <div className="bg-slate-100">
        <div className="custom-container">
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
          {isError && <Error message={error?.data?.message} />}

          {/* Not Found */}
          {!isLoading && !isError && categories?.length === 0 && (
            <NotFound message="Categories Not Found" />
          )}

          {/* Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {!isLoading &&
              !isError &&
              categories?.length > 0 &&
              categories?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
