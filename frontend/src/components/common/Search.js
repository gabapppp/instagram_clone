import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

import userService from "../../services/user.service";
import { useHistory } from "react-router";

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
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const history = useHistory();

  const onChangeHandle = async (value) => {
    // this default api does not support searching but if you use google maps or some other use the value and post to get back you reslut and then set it using setOptions
    const user = await userService.search(value).then((res) => {
      return res.data;
    });

    setOptions(Object.keys(user).map((key) => user[key].username));
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

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
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        loading={loading}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search…"
            className={classes.input}
            onChange={(ev) => {
              // dont fire API if the user delete or not entered anything

              if (ev.target.value !== "" || ev.target.value !== null) {
                onChangeHandle(ev.target.value);
              }
            }}
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
