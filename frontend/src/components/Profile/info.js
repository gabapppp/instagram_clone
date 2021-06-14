import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: theme.spacing(4),
    margin: "auto",
    maxWidth: 600,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function Info(props) {
  const classes = useStyles();
  const { username, image } = props.data;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0} padding={2}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase>
              <Avatar className={classes.image} alt="complex" src={image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {username}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Follower: {12} Following:{12}
                </Typography>
                <Typography variant="body2">Pham Ngoc Khiem</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
