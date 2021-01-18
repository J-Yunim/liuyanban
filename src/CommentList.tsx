import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import './CommentList.css'
import CommentRow from './CommentRow';
import store, { Dispatch, RootState } from './reducers';
import {Comment} from './reducers/count';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; 

function CommentList() {

        const {comments} = store.getState().count

        
    
    return (
        
        <div className="commentList">
            <List className='commentList__list'
                itemLayout="vertical"
                size='default'
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5,
                }}
                dataSource={comments}
                renderItem={(item,index) => (
                <CommentRow key={index} user={item.user} comment={item.comment} />
                
                )}
            />
            {/* <div>
                {comments.map((comment:Comment, i:number) => <CommentRow key={i} user={comment.user} comment={comment.comment} />)}
            </div>  */}
        </div>
    )
    
}
const mapState = (state:RootState) => ({
    count: state.count,
})
const CommentListContainer = connect(mapState)(CommentList)

export default CommentListContainer;