import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  // isError 는 오류 여부를 파악해줌
  const { data, isLoading, isError } = useQuery(["posts"], fetchPosts, {
    staleTime: 2000,
  });
  return (
    <>
      <ul>
        {isLoading ? (
          <div>로딩중입니다...</div>
        ) : (
          data.map((post) => (
            <li
              key={post.id}
              className="post-title"
              onClick={() => setSelectedPost(post)}
            >
              {post.title}
            </li>
          ))
        )}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
