import { createModel } from '@rematch/core'
import { Comment } from 'antd';
import { RootModel } from './model'


export type Comment ={
  id:string,
    user: string,
    comment: string,
    like: number,
    dislike: number,
    replies: Reply[],
    postdate: Date,

}

export type Reply = {
  reply: string,
  postdate: Date,
}

export interface CommentState {
  comments: Comment[],
  show:Comment[],
}

export const count =createModel<RootModel>()({
    state: {comments: [], show:[]} as CommentState, // initial state
    reducers: {
      // handle state changes with pure functions
      updateState(
        state: CommentState,
        payload: Comment
      ):CommentState{
        let newcom = state.show.map(com => {
          if (com.id === payload.id){
            return payload;
          }else{
            return com;
          }
        })
        return {
          ...state,
          comments: newcom,
          show: newcom,
        }
      },
      updateSequence(
        state: CommentState,
        show: Comment[]
      ):CommentState{
        return {
          ...state,
          show: show,
        }
      },
      
      addComment(state, comment:Comment) {
        return {
          ...state,
          comments: [...state.comments, comment],
          show: [...state.comments, comment],
        }
      },
      deleteComment(state, id:string){
        return {
          ...state,
          comments: state.comments.filter(e => e.id !== id),
          show: state.comments.filter(e => e.id !== id),
        }
      },
      search(state,key:string){
        return {
          ...state,
          show: state.comments.filter(e => e.comment.includes(key)|| e.user.includes(key)),
        }
      },
      default(state){
        return {
          ...state,
          show: state.comments
        };
      },


    },
    // effects: (dispatch) => ({
    
    // })
  });

  