import React, { useState } from 'react'
import './CommentRow.css'
import store from './reducers'
import {Comment} from './reducers/count';
import { Modal } from 'antd';
import {LikeOutlined, DislikeOutlined, CommentOutlined} from '@ant-design/icons';
import CommentReply from './Reply/CommentReply';
import ReplyContainer from './Reply/ReplyContainer';

type props = {
    com: Comment
}
const CommentRow: React.FC<props> = (props) => {
    const { com } = props
    const {id, user, comment, like, dislike, replies, postdate} = com;

    const {dispatch} = store;

    const {confirm} = Modal;

    const [editMode,setEditMode] = useState(false);
    const [commentMode,setCommentMode] = useState(false);

    
    function handleComment (){
        setCommentMode(!commentMode);
    }

    function handleDelete (){
        confirm({
            title:'确认删除吗？',
            onOk() {
                dispatch.count.deleteComment(id);
              },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    const handleChange = (type: string, value: any) => {
        const params = {
            [type]: value
        }
        const newcom ={
            ...com,
            ...params
        }
        dispatch.count.updateState(
            newcom  
        )

    }
    return (
        <div className="commentRow">
            <div className='commentRow__main'>
                <div className="commentRow__info">
                    <div className="topinfo">
                        <div className="commentRow__user">{user}</div>：
                        {editMode? <textarea style={{width:'220px',height:'100px',resize:'none'}} value={comment} onChange={(e) => {handleChange('comment', e.target.value)}} onBlur={() => setEditMode(false)}></textarea> : <p className="commentRow__content">{comment}</p>}
                    </div>
                    <div className="bottominfo">
                        <div className="iconContainer" onClick={() => handleChange('like', like + 1)}><LikeOutlined className='bottominfo__icon' /><p>{like}</p></div>
                        <div className="iconContainer" onClick={() => handleChange ('dislike', dislike + 1)}><DislikeOutlined className='bottominfo__icon' /><p>{dislike}</p></div>
                        <div className="iconContainer" onClick={handleComment}><CommentOutlined className='bottominfo__icon' /><p>{replies.length}</p></div>
                        <p>{postdate.toUTCString().slice(4,)}</p>
                    </div>
                </div>
                <div className="commentRow__buttons">
                    <button className="edit" onClick={() => setEditMode(true)}>Edit</button>
                    <button className='delete' onClick={handleDelete}>Delete</button>
                </div>
            </div>
            {commentMode && <ReplyContainer com={com} />}
            
        </div>
    )
}

export default CommentRow
