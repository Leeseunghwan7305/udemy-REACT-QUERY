import { useMutation, useQuery } from "@tanstack/react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
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
  const { data, isLoading, isError } = useQuery(["getCommnet", post.id], () =>
    fetchComments(post.id)
  );
  const deleteMutation = useMutation((postId) => deletePost(postId)); //인수전달가능
  const updateMutation = useMutation(() => updatePost(post.id));
  if (isError) {
    return "An error occurred";
  }

  return (
    <>
      {updateMutation.isLoading ? <p>updating data</p> : ""}
      {updateMutation.isSuccess ? <p>update finish!</p> : ""}
      {updateMutation.isError ? <p>updateError data</p> : ""}
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button
        onClick={() => {
          deleteMutation.mutate(post.id);
        }}
      >
        Delete
      </button>
      {deleteMutation.isError && <p>Error deleting the post</p>}
      {deleteMutation.isLoading && <p>deleting the post</p>}
      {deleteMutation.isSuccess && <p>Post has been deleted</p>}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
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
