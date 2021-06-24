import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Info from "../components/Profile/info";
import postsService from "../services/posts.service";
import { getprofile } from "../actions/profile";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 900,
    minHeight: 500,
  },
}));
function Profile() {
  const classes = useStyles();
  const { username } = useParams();
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getprofile());
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      await postsService.getPost(username).then((response) => {
        setPost(response.data.results);
      });
    }
    fetchData();
  }, [username]);

  return (
    <div style={{ marginTop: "64px" }}>
      <Info username={username} />
      <Paper className={classes.paper} square elevation={0}>
        <GridList cellHeight={196} className={classes.gridList} cols={3}>
          {post.map((index) => (
            <GridListTile key={index.pk} cols={1}>
              <img src={index.images[0].modelimage} alt={index.caption} />
            </GridListTile>
          ))}
        </GridList>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Profile);
