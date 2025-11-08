import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <App />
    </Provider>
  </QueryClientProvider>
);
