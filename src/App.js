import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
