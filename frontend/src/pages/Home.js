import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostCard from "../components/Home/postcard";

import PostService from "../services/posts.service";

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

export default function Home() {
  const classes = useStyles();
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await PostService.getFeed().then((response) => {
        setFeed(response.data.results);
      });
    }
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        {feed.map((index) => (
          <div className={classes.card} key={index.pk}>
            <PostCard {...index}></PostCard>
          </div>
        ))}
      </Grid>
    </div>
  );
}
