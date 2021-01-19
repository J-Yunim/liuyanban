import React, { useState } from 'react';
import { connect } from 'react-redux';
import './CommentList.css'
import CommentRow from './CommentRow';
import store, { Dispatch, RootState } from './reducers';
import {Comment} from './reducers/count';
import { List } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css'; 
import { isTemplateSpan } from 'typescript';


const mapState = (state:RootState) => ({
    show: state.count.show
});

const mapDispatch = (dispatch:Dispatch) => ({
    updateSequence: (com:Comment[]) => dispatch.count.updateSequence(com),
    search: (searchkey:string) => dispatch.count.search(searchkey),
    default: () => dispatch.count.default(),
})

interface CommentListProps extends ReturnType<typeof mapState>,  ReturnType<typeof mapDispatch>{}

const CommentList: React.FC<CommentListProps> = (props) => {
        const {show, updateSequence,search} = props;
       
        const [searchkey, setSearchkey] = useState('');
        const [on, setOn] = useState('')
        
        function handleInput(e:React.ChangeEvent<HTMLInputElement>) {
            setSearchkey(e.target.value);
        }

        function handleSearch() {
            search(searchkey);
        }
        function handleSort(key:keyof Comment, ascending:boolean) {

            setOn('on');
            
            const compare = (a: Comment, b: Comment) : number => {
                if(key === 'like'){
                    return a.like-b.like;
                }else if (key==='postdate'){
                    return a.postdate.getDate()-b.postdate.getDate();
                } else if (key==="replies"){
                    return a.replies.length-b.replies.length;
                }else{
                    return 0;
                }
            }
            let newshow = show.sort(compare);
            if(!ascending){
                newshow.reverse();
            }
            updateSequence(newshow);
            
        }


    return (
        
        <div className="commentList">
            <div className="commentlist__top">
                <div className="commentlist__search">
                    <input placeholder='user/comment...' value={searchkey} onChange={(e) => handleInput(e)}></input>
                    <SearchOutlined onClick={handleSearch} className="commentlist__searchIcon" />
                </div>
                <div className="commentList__sort">
                    <ul>
                        <li className={on} onClick={()=>{}}>默认</li>
                        <li className={on} onClick={()=>handleSort('postdate',false)}>最新</li>
                        <li className={on} onClick={()=>handleSort('like',false)}>赞</li>
                        <li className={on} onClick={()=>handleSort('replies',false)}>评论数</li>
                    </ul>
                </div>
            </div>
            <List className='commentList__list'
                itemLayout="vertical"
                size='default'
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5,
                }}
                dataSource={show}
                renderItem={(item) => {
                    return <CommentRow com={item} />
                }
                }
            />
        </div>
    )
    
}

const CommentListContainer = connect(mapState, mapDispatch)(CommentList)

export default CommentListContainer;