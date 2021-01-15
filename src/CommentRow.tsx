import React from 'react'
import './CommentRow.css'
import {Comment} from './reducers/count'


function CommentRow({user, comment}:Comment) {
    return (
        <div className="commentRow">
            <div className="commentRow__user">{user}</div>：
            <p className="commentRow__content">{comment}</p>
            
        </div>
    )
}

export default CommentRow
