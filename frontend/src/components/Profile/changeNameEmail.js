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

export default function ChangeIn4() {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const username = useSelector((state) => state.profile.profile.username);
  const { first_name, last_name, email } = useSelector(
    (state) => state.profile.profile.user
  );
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [Email, setEmail] = useState(email);

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

  const handleFirstChange = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  const handleLastChange = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleAccept = (e) => {
    e.preventDefault();
    userService
      .changeNameEmail(username, firstName, lastName, Email)
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
        Your information has been changed successfully
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
        Change your information
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">
          Change your information
        </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            type="text"
            value={firstName}
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleFirstChange}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            label="Last Name"
            type="text"
            value={lastName}
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleLastChange}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            label="Email"
            value={Email}
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleEmailChange}
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
