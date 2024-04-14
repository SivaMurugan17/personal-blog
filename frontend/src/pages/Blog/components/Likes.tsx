import { Blog, State } from "../../../constants/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as redHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as whiteHeart } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { likePost, unlikePost } from "../../../service/blogService";


const Likes = ({ blog }: { blog: Blog }) => {
    const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);

    const user = useSelector((state: State) => state.user.value);

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
                        onClick={()=>unlikePost(user.email,blog.id)}
                        className='text-red-600'>
                        <FontAwesomeIcon icon={redHeart} />
                    </button>
                    :
                    <button
                        onClick={()=>likePost(user.email,blog.id)}>
                        <FontAwesomeIcon icon={whiteHeart} />
                    </button>
            }
        </div>
    )
}

export default Likes