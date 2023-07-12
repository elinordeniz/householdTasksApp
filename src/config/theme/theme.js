import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
   // mode: "light",
    primary: {
      main: "#454545",
      light: '#FFF4E0',

    },
    secondary: {
      main: "#FF6000",
      light:"#FFA559",

    },
    darker:{
        main:"#006064"
    }
  },
//   typography: {
//     fontFamily: [
//       'Roboto',
//       "Montserrat",
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','), 
//     h1:{
//         fontSize: '1.8rem'
//     },
//     h3:{
//         fontSize: '1.5rem'
//     },
//     p:{
//         fontSize: '1.2rem',
//         '@media (min-width:600px)': {
//         fontSize: '1.5rem',

//         }
//     }
//   },
 
});

// export const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });
