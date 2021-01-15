import { createModel } from '@rematch/core'
import { RootModel } from './model'

export type Comment ={
  user: string,
  comment: string,
}

export interface CommentState {
  comments: Array<Comment>
}

export const count =createModel<RootModel>()({
    state: {comments: []} as CommentState, // initial state
    reducers: {
      // handle state changes with pure functions
      addComment(state, comment:Comment) {
        return {
          comments: [...state.comments,comment]
        }
      }
    },
    // effects: (dispatch) => ({
    //   // handle state changes with impure functions.
    //   // use async/await for async actions
    //   async incrementAsync(comment:Comment, state) {
    //     console.log('This is current root state', state);
    //         await new Promise(resolve => setTimeout(resolve, 1000))
    //         dispatch.count.addComment(comment)
    //   }
    // }),
  });

  