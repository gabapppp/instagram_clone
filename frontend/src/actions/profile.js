import { SET_PROFILE } from "./types";

import userService from "../services/user.service";

export const getprofile = () => (dispatch) => {
  return userService.getMyProfile().then(
    (data) => {
      dispatch({
        type: SET_PROFILE,
        payload: { profile: data.data },
      });
    },
    (err) => {
      console.error(err);
    }
  );
};
