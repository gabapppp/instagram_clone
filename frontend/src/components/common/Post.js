import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/button";
import IconButton from "@material-ui/core/IconButton";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import postsService from "../../services/posts.service";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
}));

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
export default function PostAdd() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCaptionChange = (e) => {
    e.preventDefault();
    setCaption(e.target.value);
  };

  const handlePostAdd = (e) => {
    e.preventDefault();
    setOpen(false);
    postsService.postPost(caption, image);
  };

  const handleFileRead = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    if (base64) {
      var image = { modelimage: base64 };
      var list = [image];
      setImage(list);
      console.log();
    }
  };

  return (
    <div>
      <IconButton color="action" onClick={handleClickOpen}>
        <AddBoxOutlinedIcon style={{ fontSize: 37 }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="lg"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="form-dialog-title">Add some new photos</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="caption"
            label="Caption"
            type="text"
            onChange={handleCaptionChange}
          />
          <br />
          <TextField
            type="file"
            inputProps={{
              accept: "image/*",
            }}
            required
            label="Image"
            onChange={handleFileRead}
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePostAdd} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
