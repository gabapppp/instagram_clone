import { GET_FEED } from "../actions/types";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FEED:
      return { message: payload };
    default:
      return state;
  }
}
