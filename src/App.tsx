import { RouterProvider } from "@tanstack/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { router } from "./router";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools
          initialIsOpen
          position="bottom-left"
          toggleButtonProps={{
            style: {
              marginLeft: "5.5rem",
              transform: `scale(.7)`,
              transformOrigin: "bottom left",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
};

export default App;
