import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { system } from "./src/theme"; // path adjust agar alag ho

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ChakraProvider value={system}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </ChakraProvider>
  );
}
