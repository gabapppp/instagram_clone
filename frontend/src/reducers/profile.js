import { SET_PROFILE } from "../actions/types";

const initialState = {
  profile: [],
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: payload.profile,
      };

    default:
      return state;
  }
};
