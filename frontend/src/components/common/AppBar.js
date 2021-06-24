import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import TelegramIcon from "@material-ui/icons/Telegram";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import "@fontsource/grand-hotel";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";

import Search from "./Search";
import PostAdd from "./Post";

import { logout } from "../../actions/auth";
import { getprofile } from "../../actions/profile";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 0,
    alignItems: "center",
  },
  titleBtn: {
    textTransform: "none",
    margin: "auto",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  title: {
    fontFamily: "Grand Hotel",
    fontSize: 27,
  },
  sectionDesktop: {
    display: "flex",
    margin: "auto",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const divRef = useRef();
  const { profile: currentProfile } = useSelector((state) => state.profile);

  const isMenuOpen = Boolean(anchorEl);
  const id = isMenuOpen ? "simple-popover" : undefined;

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getprofile());
  }, [dispatch]);
  const routeToHome = () => {
    history.push(`/`);
  };

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(divRef.current);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    handleMenuClose();
    history.push("/" + currentProfile.username);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleMenuClose}
      open={isMenuOpen}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar
        elevation={0}
        style={{ borderBottom: "1px solid #eeeeee " }}
        color="inherit"
        position="fixed"
      >
        <Toolbar>
          <Button className={classes.titleBtn} onClick={routeToHome}>
            <Typography className={classes.title} variant="h6">
              Instapy
            </Typography>
          </Button>
          <Search />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={routeToHome}>
              <HomeIcon style={{ fontSize: 27 }} />
            </IconButton>
            <IconButton color="inherit">
              <Badge color="secondary">
                <TelegramIcon style={{ fontSize: 27 }} />
              </Badge>
            </IconButton>
            <PostAdd />
            <IconButton color="inherit">
              <Badge color="secondary">
                <FavoriteBorderOutlinedIcon style={{ fontSize: 27 }} />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
              aria-describedby={id}
              ref={divRef}
            >
              <Avatar
                style={{ height: "30px", width: "30px" }}
                src={currentProfile.image}
              ></Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
