import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import "@fontsource/grand-hotel";
import Menu from "./menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  toolbar: {
    width: "90%",
    maxWidth: "900px",
    alignSelf: "center",
    maxHeight: "100%",
  },
  logoButton: {
    fontFamily: "Grand Hotel",
    fontSize: "25px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "0.25px solid #e6e6e6",
    backgroundColor: "#fafafa",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function AppBarHeader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar className={classes.toolbar}>
          <Button className={classes.logoButton}>Instapy</Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  );
}
