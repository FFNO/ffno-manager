import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";

import { MantineProvider, Select, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { queryClient } from "./api";

const theme = createTheme({
  fontFamily: "Inter",
  fontFamilyMonospace: "JetBrains Mono",
  primaryColor: "orange",
  components: {
    Select: Select.extend({
      defaultProps: {
        checkIconPosition: "right",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="bottom-right" />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
