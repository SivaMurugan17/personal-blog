import { State } from '../../../constants/types';
import axios from 'axios';
import { API_URL_BLOG } from '../../../constants/env-variables';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { modules } from '../../../components/QuillToolbar';
import { formats } from '../../../components/QuillToolbar';
import '.././NewBlog.css';
import { BLACK_BUTTON } from '../../../constants/tailwind-classes';
import TagsBar from './TagsBar';

const Textpad = () => {
    const [blogContent, setBlogContent] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const user = useSelector((state: State) => state.user);

    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            const blogPost = {
                title: title,
                content: blogContent,
                authorEmail: user.email,
                tags: tags
            };
            const response = await axios.post(API_URL_BLOG, blogPost, {
                withCredentials: true
            });
            if (response.data) {
                //successfully posted
                console.log("Successfully posted");
                navigate('/your-blogs')
            }
            else {
                //some error occured
                console.log("Some error occurred");
            }
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