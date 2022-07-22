import { useQuery } from "@tanstack/react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplacehold3er.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery(["getCommnet"], () =>
    fetchComments(post.id)
  );
  if (isError) {
    return "An error occurred";
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {isLoading ? (
        <div>로딩중입니다...</div>
      ) : (
        data?.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))
      )}
    </>
  );
}
