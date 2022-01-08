import React, { useState } from "react";
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

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [wrongOpen, setWrongOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOldChange = (e) => {
    e.preventDefault();
    setOldPassword(e.target.value);
  };

  const handleNewChange = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  const handleWrongClose = () => {
    setWrongOpen(false);
    setOpen(true);
  };

  const handleAccept = (e) => {
    e.preventDefault();
    userService
      .changepassword(oldPassword, newPassword)
      .then((response) => {
        setOpen(false);
        setSuccessOpen(true);
      })
      .catch((error) => {
        setWrongOpen(true);
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
        Your password has been changed successfully
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleSuccessClose} color="primary">
          Oke
        </Button>
      </DialogActions>
    </Dialog>
  );
  const renderWrong = (
    <Dialog
      open={wrongOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleWrongClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Wrong password !!!
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleWrongClose} color="primary">
          Oke
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <Button
        style={{ textTransform: "none", padding: 10 }}
        color="action"
        onClick={handleClickOpen}
      >
        Change password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">
          Change your password here
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Old password"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleOldChange}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            label="New password"
            type="pasword"
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleNewChange}
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
      {renderWrong}
    </div>
  );
}
