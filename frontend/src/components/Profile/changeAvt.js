import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import userService from "../../services/user.service";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  image: {
    width: 128,
    height: 128,
    margin: theme.spacing(2),
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

export default function ChangeAvt(props) {
  const [open, setOpen] = useState(false);
  const image = props.image;
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = useState(false);
  const username = useSelector((state) => state.profile.profile.username);
  const [Image, setImage] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccessClose = () => {
    setSuccessOpen(false);
    window.location.reload();
  };

  const handleFileRead = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    if (base64) {
      setImage(base64);
      console.log(base64);
    }
  };

  const handleAccept = (e) => {
    e.preventDefault();
    userService
      .changeAvt(username, Image)
      .then((response) => {
        setOpen(false);
        setSuccessOpen(true);
      })
      .catch((error) => {
        setOpen(false);
      });
  };
  const renderSuccess = (
    <Dialog
      open={successOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleSuccessClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Your bio has been changed successfully
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleSuccessClose} color="primary">
          Oke
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <div>
      <Button style={{ textTransform: "none", padding: 10 }}>
        <Avatar
          className={classes.image}
          alt="complex"
          src={image}
          onClick={handleClickOpen}
        />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Change your Avatar</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            inputProps={{
              accept: "image/*",
            }}
            required
            fullWidth
            label="Image"
            onChange={handleFileRead}
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAccept} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
      {renderSuccess}
    </div>
  );
}
