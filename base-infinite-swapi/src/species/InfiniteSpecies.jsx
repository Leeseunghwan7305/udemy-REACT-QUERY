import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isfetching,
  } = useInfiniteQuery(
    ["sw-species"],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  if (isLoading) {
    return <div>isLoading...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }
  return (
    <>
      {isfetching && <div>loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((data) => {
            return (
              <Species
                key={data.name}
                name={data.name}
                language={data.language}
                averageLifespan={data.averageLifespan}
              ></Species>
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
