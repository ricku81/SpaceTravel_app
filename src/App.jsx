import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// TO DO:
// - Update the Home page, explain features better
// - Enable planet selection for spacecraft dispatching
// - List Ships docked on planets on the Planets page