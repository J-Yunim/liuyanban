import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import './CommentList.css'
import CommentRow from './CommentRow';
import store, { Dispatch, RootState } from './reducers';
import {Comment} from './reducers/count'

function CommentList() {

        const {comments} = store.getState().count
        console.log("comments: "+comments)
    
    return (
        <div className="commentList">
            <div>
                {comments.map((comment:Comment, i:number) => <CommentRow key={i} user={comment.user} comment={comment.comment} />)}
            </div> 
        </div>
    )
    
}
const mapState = (state:RootState) => ({
    count: state.count,
})
const CommentListContainer = connect(mapState)(CommentList)

export default CommentListContainer;