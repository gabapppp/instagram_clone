import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import PostCard from "./postcard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "80px",
    backgroundColor: "#fafafa",
  },
  card: {
    paddingTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));
function PostList(props) {
  const classes = useStyles();
  if (!props.data) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className={classes.root}>
        <Grid container direction="column" justify="center" alignItems="center">
          {props.data.map((index) => (
            <div className={classes.card} key={index.pk}>
              <PostCard data={index} />
            </div>
          ))}
        </Grid>
      </div>
    );
  }
}

export default PostList;
