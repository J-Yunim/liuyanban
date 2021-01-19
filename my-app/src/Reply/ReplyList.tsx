import React from 'react'
import store, { RootState } from '../reducers';
import { List } from 'antd';
import CommentReply from './CommentReply';
import { connect } from 'react-redux';
import {Comment} from '../reducers/count';

 const mapState = (state:RootState) => ({
        comments: state.count.comments
})

type comProps={
    com:Comment,
}

interface Props extends ReturnType<typeof mapState>, comProps{}

const ReplyList:React.FC<Props> = (props) => {

   const {id} = props.com;
   const {comments} = props;
   let {replies} = comments.filter(item => item.id == id )[0]

    return (
        <div className='replyList'>
            <List className='replyList__list'
                itemLayout="vertical"
                size='default'
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
                }}
                dataSource={replies}
                renderItem={(item) => {
                    return <CommentReply reply={item} />
                }
                }
            />
        </div>
    )
}

export default connect(mapState)(ReplyList);
