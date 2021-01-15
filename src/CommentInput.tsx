import React, {useState } from 'react';
import './CommentInput.css'
import store from './reducers';

function CommentInput() {

    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('')

    const {dispatch} = store
    let uname = false
    let com = false
    function handleSubmit(){
        
        if(!username.trim()){
            uname = true;
            alert('请输入用户名');
            return;
        }
        if(!comment.trim()){
            com = true;
            alert('请输入评论');
            return;
        }
        dispatch.count.addComment({
            user: username.trim(),
            comment: comment.trim(),
        })
        setComment('')
    }
    

    return (
        <div className="commentInput">
            <div className="commentInput__field">
                <span className="commentInput__label">用户名：</span>
                <input value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setUsername(e.currentTarget.value);
                                            }
                } />
            </div>
            <div className="commentInput__field">
                <span className="commentInput__label">评论内容：</span>
                <textarea value={comment} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                setComment(e.currentTarget.value);
                                            }}
                />
            </div>
            <div className='commentInput__buttonContainer'>
                <button className='commentInput__button' onClick={handleSubmit}>发布</button>
            </div>
        </div>
    )
}

export default CommentInput;
