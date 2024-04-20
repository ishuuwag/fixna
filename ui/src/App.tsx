import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import "nprogress/nprogress.css";
import "./App.css";

function App() {
  const content = useRoutes(routes());
  return <>{content}</>;
}

export default App;
