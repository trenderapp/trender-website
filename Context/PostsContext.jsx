import React, { useReducer } from 'react'
import { initialState, reducer } from "./Reducer/Posts";

export const PostsContext = React.createContext();
export const PostsrequestContext = React.createContext();

export const PostsListContext = React.createContext({
    posts: [],
    dispatch: () => {}
});

export const PostsContextProvider = PostsContext.Provider;
export const PostsRequestContextProvider = PostsrequestContext.Provider;

export const PostsListContextProvider = ({ children }) => {
    const [posts, dispatch] = useReducer(reducer, initialState)

    return (
        <PostsListContext.Provider value={{posts, dispatch}}>
            { children }
        </PostsListContext.Provider>
    )
}