import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import '@fontsource/grand-hotel';

const styles = theme => ({
  title: {
    fontFamily: "Grand Hotel"
  },
  button: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent"
    },
    marginRight: '5%'
  }
});

function LogoButtons(props) {
  const { classes } = props;
  return (
    <Button className={classes.button}>
      <Typography className={classes.title} variant="h4">Instapy</Typography>
    </Button>
  );
}

LogoButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogoButtons);