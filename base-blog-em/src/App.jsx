import { Posts } from "./Posts";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function App() {
  return (
    // provide React Query client to App
    <div className="App">
      <h1>Blog Posts</h1>
      <Posts />
    </div>
  );
}

export default App;
