import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  setNotifications,
  mark_all_as_read,
  set_unread_count,
} from "../../actions/notifications";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Badge from "@material-ui/core/Badge";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #eeeeee",
    minWidth: "70vh",
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
  const { notifications: current, unread_count } = useSelector(
    (state) => state.notifications
  );
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setNotifications());
      dispatch(set_unread_count());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (anchorEl) {
      const interval = setTimeout(() => {
        dispatch(mark_all_as_read());
        dispatch(set_unread_count());
      }, 500);
      return () => {
        clearTimeout(interval);
      };
    }
  }, [anchorEl, dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderNotification = (notification) => {
    const { actor, description, verb, timestamp } = notification;
    var date = new Date(timestamp).toLocaleDateString();

    switch (description) {
      case "like":
        return (
          <>
            <ListItemIcon>
              <Avatar
                size="small"
                src={"http://localhost:8000" + actor.image}
              />
            </ListItemIcon>
            <ListItemText primary={<Typography>{verb}</Typography>} />
            <Typography variant="body2">{date}</Typography>
          </>
        );
      default:
        return (
          <>
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">{verb}</Typography>}
            />
            <Typography variant="body2">{date}</Typography>
          </>
        );
    }
  };

  return (
    <div>
      <IconButton
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        {unread_count === 0 ? (
          <FavoriteBorderOutlinedIcon style={{ fontSize: 37 }} />
        ) : (
          <Badge color="secondary" variant="dot">
            <FavoriteBorderOutlinedIcon style={{ fontSize: 37 }} />
          </Badge>
        )}
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {current.map((index) => (
          <>
            {index.unread ? (
              <MenuItem style={{ backgroundColor: "#eeeeee" }}>
                {renderNotification(index)}
              </MenuItem>
            ) : (
              <MenuItem>{renderNotification(index)}</MenuItem>
            )}
          </>
        ))}
      </StyledMenu>
    </div>
  );
}

const mapStateToProps = (state) => ({
  notifications: state.notifications,
  unread_count: state.unread_count,
});

const mapDispatchToProps = () => {
  return {
    setNotifications,
    mark_all_as_read,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Notifications);
