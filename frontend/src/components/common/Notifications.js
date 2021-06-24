import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { setNotifications } from "../../actions/notifications";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #eeeeee",
    minWidth: "60vh",
    minHeight: "60vh",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { notifications: current } = useSelector(
    (state) => state.notifications
  );
  console.log(current);
  useEffect(() => {
    dispatch(setNotifications());
  }, [dispatch]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        <FavoriteBorderOutlinedIcon color="action" style={{ fontSize: 37 }} />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {current.map((index) => (
          <MenuItem>
            <ListItemIcon>
              <Avatar>K</Avatar>
            </ListItemIcon>
            <Typography>{index.verb}</Typography>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Notifications);
