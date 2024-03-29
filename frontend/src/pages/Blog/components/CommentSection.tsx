import { useState } from 'react';
import { Blog, Comment, State } from '../../../constants/types';
import { BLACK_BUTTON, INPUT_BOX_WITH_SLATE_COLOR } from '../../../constants/tailwind-classes';
import axios from 'axios';
import { API_URL_COMMENT } from '../../../constants/env-variables';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CommentSection = ({ blog }: { blog: Blog }) => {
    const [text, setText] = useState("");

    const user = useSelector((state: State) => state.user);

    const addComment = async () => {
        const { data } = await axios.post(`${API_URL_COMMENT}/${blog.id}`, {
            text,
            commentedBy: user.email
        }, {
            withCredentials: true
        })
        console.log(data);
    }

    const deleteComment = async (id: string) => {
        const { data } = await axios.delete(`${API_URL_COMMENT}?blogId=${blog.id}&commentId=${id}`, {
            withCredentials: true
        })
        console.log(data);
    }

    return (
        <div>
            <h2 className='text-left text-xl'>Add a comment</h2>
            <section className='flex'>
                <input onChange={(e) => setText(e.target.value)}
                    className={`${INPUT_BOX_WITH_SLATE_COLOR} basis-3/4`} />
                <button className={`${BLACK_BUTTON} basis-1/4`} onClick={addComment}>Comment</button>
            </section>
            {
                blog.comments.map((comment: Comment) => {
                    return (
                        <div className='text-left border rounded p-2 my-2'>
                            <article>
                                <span className='mr-2'>{comment.commentedBy.name}</span>
                                <span className='text-sm'>{new Date(comment.date).toDateString()}</span>
                            </article>
                            <article className='flex justify-between'>
                                <p className='text-2xl'>{comment.text}</p>
                                <button onClick={() => deleteComment(comment.id)}
                                    className='text-red-600'><FontAwesomeIcon icon={faTrash} /></button>
                            </article>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CommentSection