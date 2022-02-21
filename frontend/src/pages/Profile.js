import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Info from "../components/Profile/info";
import postsService from "../services/posts.service";
import { getprofile } from "../actions/profile";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
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
  const history = useHistory();

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
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={196}>
          {post.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.images[0].modelimage}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.caption}
                loading="lazy"
                onClick={() => history.push("/post/" + item.pk)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Profile);
