import { SET_NOTIFICATIONS } from "./types";

import notifyService from "../services/notify.service";

export const setNotifications = () => (dispatch) => {
  return notifyService.getNotifications().then(
    (data) => {
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: { notifications: data.data },
      });
      console.log(data);
    },
    (err) => {
      console.error(err);
    }
  );
};
