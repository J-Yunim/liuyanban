import React from 'react'
import { Comment } from '../reducers/count'
import CommentReply from './CommentReply'
import ReplyInput from './ReplyInput'
import ReplyList from './ReplyList'

type props = {
    com:Comment
}

const ReplyContainer:React.FC<props> = (props) => {
    const {com} = props;
    return (
        <div className='replyContainer'>
            <ReplyInput com={com} />
            <ReplyList com={com} />
        </div>
    )
}

export default ReplyContainer
