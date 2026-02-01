// App.jsx
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./configs/store-config";
import router from "./configs/router-config";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
