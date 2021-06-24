import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../../services/user.service";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/button";
import IconButton from "@material-ui/core/IconButton";

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
}));

export default function Info(props) {
  const classes = useStyles();
  const { username } = props;
  const [profile, setProfile] = useState([]);
  const {
    first_name,
    last_name,
    isFollowing,
    following_count,
    follower_count,
    image,
  } = profile;
  const [loading, setLoading] = useState();
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
    console.log("settings on click");
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

  const renderFollow = (
    <>
      {currentProfile.username !== username ? (
        <>
          {isFollowing ? (
            <Button variant="primary" onClick={handleUnfollow}>
              Unfollow
            </Button>
          ) : (
            <Button variant="primary" onClick={handleFollow}>
              Follow
            </Button>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} square elevation={0}>
        <Grid container spacing={6}>
          <Grid item>
            <ButtonBase>
              <Avatar className={classes.image} alt="complex" src={image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={5}>
              <Grid item xs>
                <Typography gutterBottom variant="h4" xs={6}>
                  {username}
                  {renderFollow}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {follower_count} Follower {following_count} Following
                </Typography>
                <Typography variant="h6">
                  {first_name} {last_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton onClick={handleSetClick}>
                <SettingsIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
