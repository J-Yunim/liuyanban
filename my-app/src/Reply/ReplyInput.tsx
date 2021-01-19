import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../reducers';
import {Comment} from '../reducers/count';
import './ReplyInput.css'

const mapState = (state:RootState) => ({
    comments: state.count.comments,
})

const mapDispatch = (dispatch:Dispatch) => ({
    updateState: dispatch.count.updateState,
})
type props = {
    com: Comment,
}

interface ReplyInputProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState>, props{}

const ReplyInput: React.FC<ReplyInputProps> = (props) => {
    const {updateState, com, comments} = props

    const [reply, setReply] = useState('');



    function handleReply(){
        updateState({
            ...com,
            replies: [...com.replies, {reply:reply, postdate:new Date()}]
        })
        setReply('')
    }

    return (
        <div className="ReplyInput"> 
            <textarea value={reply} className="ReplyInput__text" onChange={(e)=>setReply(e.target.value)}></textarea>
            <button className="ReplyInput__button" onClick={handleReply}>发布</button>
        </div>
    )
}



export default connect(mapState, mapDispatch)(ReplyInput);
