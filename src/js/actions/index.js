// src/js/actions/index.js
import { ADD_ARTICLE, REMOVE_ARTICLE, LIKE_ARTICLE, ADD_TO_COUNTER } from "../constants/action-types";

export const addArticle = article => ({
  type: ADD_ARTICLE,
  payload: article
});

export const removeArticle = id => ({
  type: REMOVE_ARTICLE,
  payload: id
});

export const likeArticle = id => ({
  type: LIKE_ARTICLE,
  payload: id
});

export const addCounter = () => ({
  type: ADD_TO_COUNTER,
  payload: 0
});
