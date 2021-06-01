/* eslint-disable no-unused-vars */
import React from "react";
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
import { InputBase } from "@material-ui/core";

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
    border: "1px solid grey",
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0, 3, 3, 3),
  },
  inputInput: {
    padding: theme.spacing(0, 0, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PostCard(props) {
  const classes = useStyles();
  const { user, caption, date_posted, likes_count, images } = props.data;
  var date = new Date(date_posted).toLocaleDateString();
  function renderImage(images) {
    return images.map((index) => (
      <CardMedia
        className={classes.media}
        key={index.id}
        image={index.modelimage}
      />
    ));
  }
  return (
    <Card className={classes.root}>
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
        <IconButton aria-label="add to favorites">
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
            inputProps={{ "aria-label": "Comment" }}
          ></InputBase>
        </CardActions>
      </div>
    </Card>
  );
}
