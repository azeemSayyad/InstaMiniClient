import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    token:null,
    user:null,
    posts:[],
    progress:0
}

const slice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === "light"?"dark":"light";
        },
        setLogin: (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout:(state)=>{
            state.progress=50;
            state.user=null;
            state.token=null;
            state.progress=100;
        },
        setFriends:(state,action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("user friends not exist :)")
            }
        },
        setPosts:(state,action)=>{
            state.posts = action.payload.posts
        },
        setPost:(state,action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts = updatedPosts
        },
        setProgress:(state,action)=>{
            state.progress = action.payload
        }
    }

})

export default slice.reducer;
export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost,setProgress} = slice.actions;
