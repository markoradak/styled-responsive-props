import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { responsiveProp, useTheme, useBreakpoints } from "styled-responsive-props";

const theme = {
  breakpoints: {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    large: 1600
  }
};

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  ${responsiveProp(["flex-direction", "direction", ["column", [600, "row"]]])}
`;

const Base = styled.div`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
`;

const A = styled(Base)`
  ${responsiveProp(["background", "bg", "yellow"])};
`;
const B = styled(Base)`
  ${responsiveProp(["background", "bg"])};
`;
const C = styled(Base)`
  ${responsiveProp(["background", "bg", "pink"])};
`;

const D = styled(Base)`
  ${responsiveProp([
  "background",
  "bg",
  ["red", [200, "green"], [500, "cyan"]]
])};
`;

const E = styled(Base)`
  ${responsiveProp(["background", "bg", "gray"])};
`;

const Main = () => (
  <Frame>
    <A bg={["red", [200, "purple"], "blue"]} />
    <B bg="green" />
    <C bg={[[200, "orange"]]} />
    <D bg="black" />
    <E bg={[[useBreakpoints().tablet, "red"]]} />
  </Frame>
);

export default () => (
  <ThemeProvider theme={theme}>
    <Main />
  </ThemeProvider>
);
