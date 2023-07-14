import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";

import { Link } from "react-router-dom";

import { styled } from "@mui/material";

export const LayoutContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  mwidth:"100%",
  display: "flex",
  flexFlow: "column nowrap",
  position: "relative",
  a: {
    textDecoration: "none",
  },
}));

export const PublicContainer = styled(Box)(() => ({
  height: "100%",
  width:"100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flex: "space-between",
}));

export const PublicHeader = styled(Box)(({ theme }) => ({
  marginTop: "3.5rem",
  color: theme.palette.primary.main,
  display: "flex",
  minHeight: "70px",
  width: "100%",
  padding: "1em",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));

export const PublicMain = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "160px",
}));

export const PublicLoginButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: "white",
  marginTop: "3.5rem",
  marginBottom: "3.5rem",
  display: "flex",
  minHeight: "60px",
  minWidth: "120px",
  padding: "1em",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "1.1rem",
  fontWeight: 600,
  a: {
    textDecoration: "none",
  },
  ":hover": {
    color: theme.palette.secondary.main,
    background: theme.palette.primary.light,
  },
}));

export const PublicMainList = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,

  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",

  ul: {
    margin: "1rem",
    li: {
      marginTop: "1rem",
      background: theme.palette.primary.light,
      padding: "0.5rem",
    },
  },
}));

export const PublicFooter = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "flex",
  minHeight: "50px",
  width: "100%",
  padding: "3em",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  bottom: "0",
  left: "0",
  overflow: "hidden",
  marginBottom:"2rem",
  marginBottom:"2rem",


  p: {
    fontSize: "1.2rem",

    margin: "1rem",
    span: {
      fontWeight: 600,
    },
  },
}));

export const LoginContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "md",
  minHeight: "100%",
  overflow: "auto",
  color: theme.palette.primary.main,
  a: {
    textDecoration: "none",
  },
}));

export const SigninButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: "white",
  display: "flex",
  height: "50px",
  width: "120px",
  padding: "1em",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "1.1rem",
  fontWeight: 600,
  marginTop: "1.5rem",
  alignSelf: "center",
  a: {
    textDecoration: "none",
  },
  ":hover": {
    color: theme.palette.secondary.main,
    background: theme.palette.primary.light,
  },
}));

export const BackHomeButton = styled(Button)(({ theme }) => ({
  display: "flex",
  padding: "1em",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "1.1rem",
  fontWeight: 300,
  marginTop: "1.5rem",
  alignSelf: "center",
  a: {
    textDecoration: "none",
  },
}));

export const LoginHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "1.5rem",

  h1: {
    fontSize: "2rem",
    fontWeight: 500,
  },
}));

export const ErrorHeader = styled(Box)(({ theme }) => ({
  margin: "1.5rem",
  background: theme.palette.primary.light,
  color: "red",
  fontWeight: 500,
  padding: "1rem",
  textAlign: "center",
}));

export const DashLayoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "md",
  height: "100%",
  overflow: "auto",
  color: theme.palette.primary.main,
  a: {
    textDecoration: "none",
  },
}));

export const DashHeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingLeft:"12px",
  flexDirection: "row",
  flex: "space-between",
  alignItems: "center",
  width: "100%",
  minHeight: "70px",
  marginTop: "1rem",
  marginBottom: "1.8rem",

}));

export const LogoLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.secondary.main,
  marginRight: "50px",
  h1: {
    fontSize: "1.5rem",
  },
}));
export const WelcomeGrid = styled(Paper)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  marginTop: "2rem",
  padding: "1rem",
}));

export const LinkCard = styled(Card)(({ theme }) => ({
  background: theme.palette.secondary.light,
  color: "white",
  minWidth: "300px",
  minHeight: "30px",
  padding: "1rem",
  //marginTop: "0.8rem",
  // a: {
  //   textDecoration: "none",
  // },
}));

export const HeaderButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.secondary,
  // textColor: "white",
  width: "60px",
  height: "60px",
  padding: "10px",
  svg: {
    width: "30px",
    height: "30px",
    color: theme.palette.secondary.light,
  },
}));

export const DashFooterContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "50px",
  padding: "1rem",
  marginTop: "3rem",
  marginBottom:"1rem",

  p: {
    marginLeft: "1.5rem",
    fontSize: "1.2rem",
  },
}));

export const AddUserContainer= styled(Box)(({theme})=>({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "md",

  color: theme.palette.primary.main,
  a: {
    textDecoration: "none",
  },
  div:{
    svg:{
      width:"35px",
      height:"35px",
      color: theme.palette.secondary.main
    }
  },
span:{
  margin:"0.5rem"
}
}))

export const EditTaskContainer= styled(Box)(({theme})=>({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "md",

  color: theme.palette.primary.main,
  a: {
    textDecoration: "none",
  },
  div:{
    svg:{
      width:"35px",
      height:"35px",
      color: theme.palette.secondary.main,
      background:"white",
      border:'none'
    }
  },
span:{
  margin:"0.5rem",
  fontWeight:500
}
}))