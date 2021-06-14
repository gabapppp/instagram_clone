import React, { useEffect, useState } from "react";

import LikeService from "../../services/like.service";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, InputBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    width: "88vw",
    maxWidth: "700px",
  },
  media: {
    paddingTop: "90%",
  },
  avatar: {
    backgroundColor: red[500],
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
  const { pk, user, caption, date_posted, likes_count, images } = props.data;
  var date = new Date(date_posted).toLocaleDateString();
  const [isLike, setIsLike] = useState(false);
  function renderImage(images) {
    return images.map((index) => (
      <CardMedia
        className={classes.media}
        key={index.id}
        image={index.modelimage}
      />
    ));
  }

  useEffect(() => {
    async function fetchLike() {
      await LikeService.getLike(pk).then((res) => {
        if (res.data.length > 0) {
          setIsLike(res.data[0].pk);
        }
      });
    }
    fetchLike();
  });
  const like = (e) => {
    e.preventDefault();
    if (isLike) {
      LikeService.delLike(isLike).then(() => {
        props.data.likes_count -= 1;
        setIsLike(false);
      });
    } else {
      LikeService.postLike(pk).then(() => {
        props.data.likes_count += 1;
        setIsLike(true);
      });
    }
  };
  const cmtBtnClick = () => {};
  return (
    <Card
      className={classes.root}
      elevation={0}
      style={{ border: "1px solid #eeeeee" }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" fontStyle="bold">
            {user}
          </Typography>
        }
        subheader={date}
      />
      {renderImage(images)}
      <CardContent style={{ paddingBottom: "0px" }}>
        <Typography variant="body1" color="textSecondary" component="p">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={like}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
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
            inputProps={{ "aria-label": "Comment" }}
          ></InputBase>
          <Button className={classes.cmtBtn} onClick={cmtBtnClick}>
            Post
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
