import { SET_NOTIFICATIONS, MARK_ALL_AS_READ, SET_UNREAD_COUNT } from "./types";

import notifyService from "../services/notify.service";

export const setNotifications = () => (dispatch) => {
  return notifyService.getNotifications().then(
    (data) => {
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: { notifications: data.data },
      });
    },
    (err) => {
      console.error(err);
    }
  );
};

export const mark_all_as_read = () => (dispatch) => {
  notifyService.mark_all_as_read();
  return notifyService.getNotifications().then(
    (data) => {
      dispatch({
        type: MARK_ALL_AS_READ,
        payload: { notifications: data.data },
      });
    },
    (err) => {
      console.error(err);
    }
  );
};

export const set_unread_count = () => (dispatch) => {
  return notifyService.get_unread_count().then((data) => {
    dispatch({
      type: SET_UNREAD_COUNT,
      payload: data.data,
    });
  });
};
