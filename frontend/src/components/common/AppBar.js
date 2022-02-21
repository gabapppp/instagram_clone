import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Notifications from "./Notifications";
import "@fontsource/grand-hotel";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";

import Search from "./Search";
import PostAdd from "./Post";

import { logout } from "../../actions/auth";
import { getprofile } from "../../actions/profile";
import { set_unread_count } from "../../actions/notifications";

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

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #eeeeee",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { profile: currentProfile } = useSelector((state) => state.profile);

  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getprofile());
    dispatch(set_unread_count());
  }, [dispatch]);

  const routeToHome = () => {
    history.push(`/`);
  };

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
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
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>
        <AccountCircleOutlinedIcon />
        <Typography>Profile</Typography>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </StyledMenu>
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
            <Typography className={classes.title} variant="h4">
              Instapy
            </Typography>
          </Button>
          <Search />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={routeToHome}>
              <HomeIcon style={{ fontSize: 37 }} />
            </IconButton>
            <PostAdd />
            <Notifications />
            <IconButton
              aria-haspopup="true"
              variant="contained"
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                style={{ height: "37px", width: "37px" }}
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
