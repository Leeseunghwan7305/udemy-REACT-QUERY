import axios from "axios";

export async function fetchingData() {
  let result = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  return result;
}
