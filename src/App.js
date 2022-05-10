import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { RoutesProvider } from "@/components/Common";
import configureStore from "./store";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <RoutesProvider />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
