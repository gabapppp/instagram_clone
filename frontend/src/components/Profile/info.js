import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../../services/user.service";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/button";
import IconButton from "@material-ui/core/IconButton";
import ChangePassword from "./Changepassword";
import ChangeBio from "./changeBio";
import ChangeIn4 from "./changeNameEmail";
import ChangeAvt from "./changeAvt";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 900,
    borderBottom: "1px solid #eeeeee",
  },
  image: {
    width: 128,
    height: 128,
    margin: theme.spacing(2),
  },
  setBtn: {
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: "none",
    },
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

export default function Info(props) {
  const classes = useStyles();
  const { username } = props;
  const [profile, setProfile] = useState({});
  const {
    first_name,
    last_name,
    isFollowing,
    following_count,
    follower_count,
    image,
    bio,
    posts_count,
  } = profile;
  const [loading, setLoading] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const { profile: currentProfile } = useSelector((state) => state.profile);
  useEffect(() => {
    async function fetchData() {
      await userService.getAnyProfile(username).then((response) => {
        setProfile(response.data);
      });
    }
    setLoading(false);
    fetchData();
  }, [username, loading]);

  const handleSetClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleFollow = (e) => {
    e.preventDefault();
    userService.follow(username).then(() => {
      setLoading(true);
    });
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    userService.unfollow(username).then(() => {
      setLoading(true);
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setLoading(false);
  };

  const renderMenu = (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <ChangePassword />
      <ChangeBio />
      <ChangeIn4 />
    </StyledMenu>
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} square elevation={0}>
        <Grid container spacing={6}>
          <Grid item>
            <ButtonBase>
              <ChangeAvt image={image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={5}>
              <Grid item xs>
                <Grid item xs container>
                  <Grid item xs={12} sm={8}>
                    <Typography
                      gutterBottom
                      variant="h3"
                      style={{ fontFamily: "Source Code Pro" }}
                    >
                      {username}
                    </Typography>
                  </Grid>
                  {currentProfile.username !== username ? (
                    <>
                      {isFollowing ? (
                        <Grid item xs={12} sm={6}>
                          <Button variant="primary" onClick={handleUnfollow}>
                            Unfollow
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={6}>
                          <Button variant="primary" onClick={handleFollow}>
                            Follow
                          </Button>
                        </Grid>
                      )}
                    </>
                  ) : (
                    <Grid item xs={12} sm={4}>
                      <IconButton
                        className={classes.setBtn}
                        onClick={handleSetClick}
                      >
                        <SettingsIcon />
                      </IconButton>
                      {renderMenu}
                    </Grid>
                  )}
                </Grid>
                <Grid item xs container>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" gutterBottom>
                      {posts_count} Posts
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" gutterBottom>
                      {follower_count} Follower
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body1" gutterBottom>
                      {following_count} Following
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h5" gutterBottom>
                  {first_name} {last_name}
                </Typography>
                <Typography variant="body2">{bio}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
