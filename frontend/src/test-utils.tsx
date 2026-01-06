import * as React from "react";
import { render } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export const renderWithChakra = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider value={defaultSystem}>
      {ui}
    </ChakraProvider>
  );
};
