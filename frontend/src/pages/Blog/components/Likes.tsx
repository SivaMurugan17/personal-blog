import { Blog, State } from "../../../constants/types"
import axios from "axios";
import { API_URL_BLOG } from "../../../constants/env-variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as redHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as whiteHeart } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const Likes = ({ blog }: { blog: Blog }) => {
    const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);

    const user = useSelector((state: State) => state.user);

    const likePost = async () => {
        const { data } = await axios.post(`${API_URL_BLOG}/like?userEmail=${user.email}&blogId=${blog.id}`);
        console.log(data);
    }

    const unlikePost = async () => {
        const { data } = await axios.delete(`${API_URL_BLOG}/like?userEmail=${user.email}&blogId=${blog.id}`);
        console.log(data);
    }

    const checkUserLiked = () => {
        let flag = false;
        console.log(user.email)
        console.log(blog.likedBy)
        blog.likedBy.map((email) => {
            if (email === user.email) flag = true;
        })
        setIsCurrentUserLiked(flag);
    }

    useEffect(() => {
        checkUserLiked();
    }, [])

    return (
        <div>
            <p>Likes : {blog.likedBy.length}</p>
            {
                isCurrentUserLiked ?
                    <button
                        onClick={unlikePost}
                        className='text-red-600'>
                        <FontAwesomeIcon icon={redHeart} />
                    </button>
                    :
                    <button
                        onClick={likePost}>
                        <FontAwesomeIcon icon={whiteHeart} />
                    </button>
            }
        </div>
    )
}

export default Likes