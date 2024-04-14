import { State } from '../../../constants/types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { modules } from '../../../components/QuillToolbar';
import { formats } from '../../../components/QuillToolbar';
import '.././NewBlog.css';
import { BLACK_BUTTON } from '../../../constants/tailwind-classes';
import TagsBar from './TagsBar';
import { postBlog } from '../../../service/blogService';

const Textpad = () => {
    const [blogContent, setBlogContent] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const user = useSelector((state: State) => state.user.value);

    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            const blogPost = {
                title: title,
                content: blogContent,
                authorEmail: user.email,
                tags: tags
            };
            postBlog(blogPost)
            .then(()=>{
                console.log("Successfully posted");
                navigate('/your-blogs')
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className='textpad my-4 max-w-2xl mx-auto'>
            <section className='flex p-4'>
                <input className='text-3xl outline-none font-medium'
                    placeholder='Title..'
                    onChange={(e) => setTitle(e.target.value)} />
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