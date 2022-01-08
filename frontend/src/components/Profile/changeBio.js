import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
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

export default function ChangeBio() {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const username = useSelector((state) => state.profile.profile.username);
  const [bio, setBio] = useState("");

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

  const handleBioChange = (e) => {
    e.preventDefault();
    setBio(e.target.value);
  };

  const handleAccept = (e) => {
    e.preventDefault();
    userService
      .changeBio(username, bio)
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
      <Button
        style={{ textTransform: "none", padding: 10 }}
        onClick={handleClickOpen}
      >
        Change your bio
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Change your Insta bio</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Bio"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleBioChange}
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
