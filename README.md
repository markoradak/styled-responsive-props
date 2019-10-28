# 📏 styled-responsive-props

> Intuitive responsive props system for styled components.

[![NPM](https://img.shields.io/npm/v/styled-responsive-props.svg)](https://www.npmjs.com/package/styled-responsive-props) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @markoradak/styled-responsive-props
```

## Usage

Register within styled component:
```jsx
${responsiveProp([cssProp, reactProp, ?defaultValue])}
```

Use within render:
```jsx
<Box direction={[?default, [minWidth, value, maxWidth]}>
```

Example:
```jsx
import React from 'react'
import styled from 'styled-components';
import { responsiveProp } from "styled-responsive-props";

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${responsiveProp(["flex-direction", "direction"])}
`;

const Example = ({ children }) => (
  <Box direction={["column", [1024, "row"]}>
    {children}
  </Box>
)
```

## License

MIT © [markoradak](https://github.com/markoradak)
