import {
  SET_NOTIFICATIONS,
  MARK_ALL_AS_READ,
  SET_UNREAD_COUNT,
} from "../actions/types";

const initialState = {
  notifications: [],
  unread_count: 0,
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload.notifications,
      };
    case MARK_ALL_AS_READ:
      return {
        ...state,
        notifications: payload.notifications,
      };
    case SET_UNREAD_COUNT:
      return {
        ...state,
        unread_count: payload.unread_count,
      };

    default:
      return state;
  }
};
