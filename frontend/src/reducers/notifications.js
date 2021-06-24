import { SET_NOTIFICATIONS } from "../actions/types";

const initialState = {
  notifications: [],
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

    default:
      return state;
  }
};
