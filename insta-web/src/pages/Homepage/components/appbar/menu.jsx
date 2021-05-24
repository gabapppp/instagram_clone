import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import ButtonIcon from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import TelegramIcon from '@material-ui/icons/Telegram';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  menu: {
    alignSelf: 'center',
  },
});


function Menu(props) {
  const { classes } = props;
  return (
    <div className={classes.menu}>
      <ButtonIcon>
        <HomeIcon className={classes.homeIcon}/>
      </ButtonIcon>
      <ButtonIcon>
        <TelegramIcon className={classes.messageIcon}/>
      </ButtonIcon>
      <ButtonIcon>
        <FavoriteBorderIcon className={classes.notifyIcon} />
      </ButtonIcon>
      <ButtonIcon>
        <AccountCircleIcon className={classes.avtarIcon} />
      </ButtonIcon>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);