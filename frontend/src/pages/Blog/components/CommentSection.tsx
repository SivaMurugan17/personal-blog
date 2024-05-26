import { useState } from 'react';
import { Blog, Comment, State } from '../../../constants/types';
import { BLACK_BUTTON, INPUT_BOX_WITH_SLATE_COLOR } from '../../../constants/tailwind-classes';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addComment, deleteComment } from '../../../service/commentService';
import { setComments } from '../../../slices/currentBlogSlice';

const CommentSection = () => {
    const [text, setText] = useState("");

    const user = useSelector((state : State) => state.user.value);
    const blog = useSelector((state : State) => state.blog);
    const comments = useSelector((state : State) => state.blog.comments);
    const dispatch = useDispatch();

    const addThisComment = (blogId : string, text : string, userEmail : string)=>{
        addComment(blogId,text,userEmail)
            .then( comments => dispatch(setComments(comments)))
            .then(()=>setText(""));
    }

    const deleteThisComment = (blogId : string,commentId : string)=>{
        deleteComment(blogId, commentId)
            .then( comments => dispatch(setComments(comments)));
    }

    return (
        <div>
            {
                !user &&
                <h2 className='text-left text-xl'>Comments</h2>
            }
            {
                user &&
                <>
                    <h2 className='text-left text-xl'>Add a comment</h2>
                    <section className='flex'>
                        <input 
                            className={`${INPUT_BOX_WITH_SLATE_COLOR} basis-3/4`}
                            onChange={(e) => setText(e.target.value)}
                            value={text} 
                        />
                        <button 
                            className={`${BLACK_BUTTON} basis-1/4`} 
                            onClick={()=> addThisComment(blog.id,text,user.email)}>
                            Comment
                        </button>
                    </section>
                </>
            }
            {
                comments.length === 0 && <p>No comments yet.</p>
            }
            {
                comments.toReversed().map((comment: Comment, index : number) => {
                    return (
                        <div className='text-left border rounded p-2 my-2' key={index}>
                            <article>
                                <span className='mr-2'>{comment.commentedBy.name}</span>
                                <span className='text-sm'>{new Date(comment.date).toDateString()}</span>
                            </article>
                            <article className='flex justify-between'>
                                <p className='text-2xl'>{comment.text}</p>
                                {
                                    comment.commentedBy.email === user?.email && 
                                    <button 
                                        className='text-red-600'
                                        onClick={() => deleteThisComment(blog.id, comment.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                }
                                
                            </article>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CommentSection