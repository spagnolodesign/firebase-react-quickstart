import {
  ADD_ARTICLE,
  REMOVE_ARTICLE,
  LIKE_ARTICLE,
  ADD_TO_COUNTER
} from "../constants/action-types";

const initialState =  {
  articles : [
    { title:"test", likes:1 },{ title:"test", likes:1 }
  ],
  counter : {
    number: 0,
    error: false
  }
}

export function articles(state = initialState, action){
  switch (action.type) {
    case ADD_TO_COUNTER:
      return {
        ...state,
        counter: {
          number: ++state.counter.number,
          error: (state.counter.number >= 10) ? true : false
        }
      };
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload]
      };
    case REMOVE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(({ id }) => id !== action.payload)
      };
    case LIKE_ARTICLE:
      const updatedArticles = state.articles.map(item => {
        if(item.id === action.payload){
          return { ...item, likes: ++item.likes }
        }
        return item
      })
      return {
        ...state,
        articles: updatedArticles
      };
    default:
      return state;
  }
};
