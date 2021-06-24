import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

import userService from "../../services/user.service";
import { useHistory } from "react-router";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid lightgrey",
    backgroundColor: "#eeeeee",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    margin: "auto",
  },
  input: {
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "29ch",
    },
  },
  searchIcon: {
    paddingLeft: theme.spacing(1),
  },
}));

export default function Search() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const user = await userService.search().then((res) => {
        return res.data;
      });
      await sleep(1e3);
      if (active) {
        setOptions(Object.keys(user).map((key) => user[key].username));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const history = useHistory();

  useEffect(() => {
    if (value) {
      history.push("/" + value);
      setValue(null);
    }
  }, [value, history]);

  return (
    <div className={classes.root}>
      <Autocomplete
        id="search"
        style={{ width: "250px" }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          history.push("/profile");
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        disableClearable
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search…"
            className={classes.input}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              startAdornment: <SearchIcon className={classes.searchIcon} />,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
