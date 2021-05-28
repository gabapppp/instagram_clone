import { GET_FEED, GET_FEED_ERROR, SET_MESSAGE } from "./types";

import FeedService from "../services/feed.service";

export const getFeed = (feed) => (dispatch) => {
  return FeedService.getFeed(feed).then(
    (response) => {
      dispatch({
        type: GET_FEED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_FEED_ERROR,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
