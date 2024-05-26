import { Blog, State } from '../constants/types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { modules } from './QuillToolbar';
import { formats } from './QuillToolbar';
import '../pages/NewBlog/NewBlog.css';
import { BLACK_BUTTON } from '../constants/tailwind-classes';
import TagsBar from '../pages/NewBlog/components/TagsBar';
import { postBlog, putBlog } from '../service/blogService';

const Textpad = ({ contentToBeEdited } : { contentToBeEdited : Blog }) => {
    const [blogContent, setBlogContent] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const user = useSelector((state: State) => state.user.value);

    const navigate = useNavigate();

    const onSubmit = async () => {
        const blogPost = {
            title: title,
            content: blogContent,
            authorEmail: user.email,
            tags: tags
        };
        if(contentToBeEdited){
            putBlog(blogPost,contentToBeEdited.id)
            .then(()=>{
                navigate('/your-blogs')
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        else{
            postBlog(blogPost)
            .then(()=>{
                navigate('/your-blogs')
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    useEffect(()=>{
        if(contentToBeEdited){
            setTitle(contentToBeEdited.title)
            setBlogContent(contentToBeEdited.content);
            setTags(contentToBeEdited.tags);
        }
    },[])

    return (
        <div className='textpad my-4 max-w-2xl mx-auto'>
            <section className='flex p-4'>
                <input className='text-3xl outline-none font-medium'
                    placeholder='Title..'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />
                <button className={`${BLACK_BUTTON} ms-auto`}
                    onClick={onSubmit}>
                    Save
                </button>
            </section>

            <TagsBar tags={tags} setTags={setTags}/>

            <ReactQuill id='1'
                theme='snow'
                value={blogContent}
                onChange={setBlogContent}
                formats={formats}
                modules={modules} />
        </div>
    )
}

export default Textpad