import React, {useState } from 'react';
import Hashids from 'hashids'
import './CommentInput.css'
import store from './reducers';
import { Alert } from 'antd';

function CommentInput() {

    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [userFlag, setUserFlag] = useState(false);
    const [comFlag, setComFlag] = useState(false);

    const {dispatch} = store

    
    function handleSubmit(){
        
        const user = username.trim();
        const com = comment.trim();

        setUserFlag(false);
        setComFlag(false)

        if(!user){
            setUserFlag(true);
            return;
        }
        if(!com){
            setComFlag(true);
            return;
        }
        const hashids = new Hashids()
        const id = hashids.encode(Date.now())
        dispatch.count.addComment({
            id: id,
            user: user,
            comment: com,
            like: 0,
            dislike: 0,
            replies: [],
            postdate: new Date(),
        })
        setComment('');
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
            {userFlag && <Alert className='commentInput__alert' message="请输入用户名" type="error" />}
            {comFlag && <Alert className='commentInput__alert' message="评论不能为空" type="error" />}
            <div className='commentInput__buttonContainer'>
                <button className='commentInput__button' onClick={handleSubmit}>发布</button>
            </div>
        </div>
    )
}

export default CommentInput;
