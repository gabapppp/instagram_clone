import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import postsService from "../services/posts.service";
import likeService from "../services/like.service";
import cmtService from "../services/cmt.service";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import PostDelDialog from "../components/Home/PostDelDialog";
import { Button, InputBase } from "@material-ui/core";
import ImagesStepper from "../components/Home/ImagesStepper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

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
  rootCard: {
    display: "block",
    width: "88vw",
    maxWidth: "700px",
  },
  media: {
    paddingTop: "90%",
  },
  comment: {
    borderTop: "1px solid #eeeeee",
    margin: theme.spacing(0),
  },
  inputInput: {
    padding: theme.spacing(0, 0, 0, 20),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  cmtBtn: {},
}));

export default function PostDetails() {
  const classes = useStyles();
  const { pk } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [likes_count, setLikesCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [cmtList, setCmtList] = useState([]);
  const [content, setContent] = useState("");
  const [pkLike, setPkLike] = useState();
  const { profile: currentProfile } = useSelector((state) => state.profile);
  const { user, avt, caption, date_posted, images } = post;
  var date = new Date(date_posted).toLocaleDateString();

  useEffect(() => {
    if (loading) {
      async function fetchData() {
        await postsService.getPostDetails(pk).then((post) => {
          setPost(post.data);
          setLikesCount(post.data["likes_count"]);
          setIsLike(post.data["isLike"]);
        });
      }
      fetchData();
      setLoading(false);
    }
  }, [pk, loading]);

  useEffect(() => {
    if (isLike) {
      async function fetchPkLike() {
        await likeService.getLike(pk, currentProfile.pk).then((response) => {
          setPkLike(response.data[0].pk);
        });
      }
      fetchPkLike();
      setLoading(false);
    }
  }, [pk, isLike, currentProfile.pk]);

  useEffect(() => {
    async function fetchData() {
      await cmtService.getcmt(pk).then((cmt) => {
        setCmtList(cmt.data);
      });
    }
    fetchData();
  }, [pk]);
  const like = (e) => {
    e.preventDefault();
    if (isLike) {
      likeService.delLike(pkLike).then(() => {
        setIsLike(false);
        setLikesCount(likes_count - 1);
      });
    } else {
      likeService.postLike(pk).then(() => {
        setIsLike(true);
        setLikesCount(likes_count + 1);
      });
    }
  };
  const handleCMTOnChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  const cmtBtnClick = (e) => {
    e.preventDefault();
    cmtService.postcmt(pk, content).then(() => {
      setContent("");
      window.location.reload();
    });
  };
  const renderImage = (images) => {
    return images.map((index) => (
      <CardMedia
        className={classes.media}
        key={index.pk}
        image={index.modelimage}
      />
    ));
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container justify="center" alignItems="center">
          <div className={classes.card}>
            <Card
              className={classes.rootCard}
              elevation={0}
              style={{ border: "1px solid #eeeeee" }}
            >
              <CardHeader
                avatar={<Avatar src={"http://localhost:8000" + avt} />}
                action={
                  <>
                    {currentProfile.username === user ? (
                      <PostDelDialog pk={pk} />
                    ) : null}
                  </>
                }
                title={
                  <Typography variant="h6" fontStyle="bold">
                    {user}
                  </Typography>
                }
                subheader={date}
              />
              {images ? (
                <>
                  {images.length === 1 ? (
                    renderImage(images)
                  ) : (
                    <CardMedia>
                      <ImagesStepper images={images} />
                    </CardMedia>
                  )}
                </>
              ) : (
                <CardMedia />
              )}
              <CardContent style={{ paddingBottom: "0px" }}>
                <Typography variant="body1" color="textSecondary" component="p">
                  {caption}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={like}>
                  {isLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton aria-label="cmt">
                  <ModeCommentOutlinedIcon />
                </IconButton>
                <Typography>{likes_count} Likes</Typography>
              </CardActions>
              <CardContent
                style={{
                  borderTop: "1px solid #eeeeee",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
              >
                {cmtList
                  ? cmtList.map((index) => (
                      <div>
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar
                                src={"http://localhost:8000/" + index.avt}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={index.user}
                              secondary={index.content}
                            />
                            {currentProfile.username === index.user ? (
                              <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            ) : null}
                          </ListItem>
                        </List>
                      </div>
                    ))
                  : null}
              </CardContent>
              <div className={classes.comment}>
                <CardActions>
                  <InputBase
                    placeholder="Comment..."
                    classes={{
                      input: classes.inputInput,
                    }}
                    style={{ marginRight: "auto" }}
                    value={content}
                    onChange={handleCMTOnChange}
                  ></InputBase>
                  <Button className={classes.cmtBtn} onClick={cmtBtnClick}>
                    Post
                  </Button>
                </CardActions>
              </div>
            </Card>
          </div>
        </Grid>
      )}
    </div>
  );
}
