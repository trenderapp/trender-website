export const initialState = []

const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const RESET_POST = "RESET_POST";

export const resetPost = () => {
    return {
        type: RESET_POST
    }
}

export const addPosts = (info) => {
    return {
      type: ADD_POST,
      info: info
    }
}

export const deletePosts = (info) => {
    return {
      type: DELETE_POST,
      info: info
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return state.concat(action.info);
        case DELETE_POST :
            return state.filter(p => p.post_id !== action.info);
        case RESET_POST :
            return [];
        default:
            return state;
    }
}