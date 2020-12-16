import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyle = createGlobalStyle`
${reset};
a {
    text-decoration: none;
    color: inherit
}
* {
    box-sizing: border-box;
}
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    background-color: rgba(40, 40, 40, 1);
    color:white;
    width: 100%;
    height: 100%;
}
input {
    border: none;
}
button {
    border: none;
}
*:focus {
    outline: none;
}
`;

export default globalStyle;
