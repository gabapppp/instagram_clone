import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
  const [fileArray, setFileArray] = useState([]);
  const [error, setError] = useState([]);

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
    if (image.length !== 0 && caption !== "") {
      postsService
        .postPost(caption, image)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("Required Images");
    }
  };

  const handleFileRead = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    if (base64) {
      var imagess = { modelimage: base64 };
      setImage([...image, imagess]);
      setFileArray([...fileArray, file.name]);
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
            size="small"
            variant="outlined"
            onChange={handleCaptionChange}
          />
          <br />
          <input
            type="file"
            accept="image/*"
            multiple
            required
            onChange={handleFileRead}
            size="small"
          />
          <DialogContent>
            {fileArray.map((file) => (
              <Typography>{file}</Typography>
            ))}
          </DialogContent>
        </DialogContent>
        <DialogContent>{error}</DialogContent>
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
