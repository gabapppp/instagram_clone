import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import likeService from "../../services/like.service";
import cmtService from "../../services/cmt.service";

import { makeStyles } from "@material-ui/core/styles";
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
import PostDelDialog from "./PostDelDialog";
import { Button, InputBase } from "@material-ui/core";
import ImagesStepper from "./ImagesStepper";

const useStyles = makeStyles((theme) => ({
  root: {
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

export default function PostCard(props) {
  const classes = useStyles();
  const { pk, user, avt, caption, date_posted, images } = props;
  const [likes_count, setLikesCount] = useState(props.likes_count);
  const [isLike, setIsLike] = useState(props.isLike);
  var date = new Date(date_posted).toLocaleDateString();
  const [content, setContent] = useState("");
  const [pkLike, setPkLike] = useState();
  const { profile: currentProfile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isLike) {
      async function fetchPkLike() {
        await likeService.getLike(pk, currentProfile.pk).then((response) => {
          setPkLike(response.data[0].pk);
        });
      }
      fetchPkLike();
    }
  }, [pk, isLike, currentProfile.pk]);
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
    });
  };
  const history = useHistory();
  const routeToPost = () => {
    history.push("/post/" + pk);
  };

  const renderImage = (images) => {
    return images.map((index) => (
      <CardMedia
        onClick={routeToPost}
        className={classes.media}
        key={index.pk}
        image={index.modelimage}
      />
    ));
  };

  return (
    <Card
      className={classes.root}
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
      {images.length === 1 ? (
        renderImage(images)
      ) : (
        <CardMedia onClick={routeToPost}>
          <ImagesStepper images={images} />
        </CardMedia>
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
  );
}
