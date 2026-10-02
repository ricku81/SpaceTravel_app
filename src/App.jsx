import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// Render.com can be used to deploy this React application easily. Vercel.com as well
// Let them take me to the code in a project walkthrough.
// What stack was used for this project? MERN