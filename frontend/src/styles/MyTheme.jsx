const { grey } = require("@mui/material/colors");




const getDesignTokens = (mode) => ({
  palette: {
    // @ts-ignore
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          ezzo: {
            main: "#f06292",
          },

          favColor: {
            main: grey[300],
          },
        }
      : {
          // palette values for dark mode
          ezzo: {
            main: "teal",
          },

          favColor: {
            main: grey[800],
          },
        }),
  },
});


export default getDesignTokens;
