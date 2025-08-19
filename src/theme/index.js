import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#eee8cdff", "#000000ff")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};
const theme = extendTheme({ styles });
export default theme;
