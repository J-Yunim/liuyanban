import React from 'react'
import { Reply } from '../reducers/count'
import './CommentReply.css'

type ReplyProps = {
    reply:Reply
}

const CommentReply:React.FC<ReplyProps> =(props)=> {
    const {reply, postdate} = props.reply
    return (
        <div className="commentReply">
            <p className="commentReply__content">{reply}</p>
            <p className="commentReply__time">{postdate.toUTCString().slice(4)}</p>
        </div>
    )
}

export default CommentReply
