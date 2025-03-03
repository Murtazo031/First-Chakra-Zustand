import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider"
import TableUsers from "@/table-users";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <TableUsers />
    </Provider>
  </React.StrictMode>
);
