import { BrowserRouter } from "react-router-dom";
import { RoutesProvider } from "@/components/Common";

function App() {
  return (
    <BrowserRouter>
      <RoutesProvider />
    </BrowserRouter>
  );
}

export default App;
