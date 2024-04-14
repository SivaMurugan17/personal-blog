import { State } from "../../../constants/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as redHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as whiteHeart } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { likePost, unlikePost } from "../../../service/blogService";
import { setLikedBy } from "../../../slices/currentBlogSlice";


const Likes = () => {
    const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);

    const user = useSelector((state: State) => state.user.value);
    const blog = useSelector((state: State) => state.blog);

    const unlikeThisPost = (userEmail : string, blogId : string)=>{
        unlikePost(userEmail,blogId)
            .then(likedBy => setLikedBy(likedBy));
    }

    const likeThisPost = (userEmail : string, blogId : string)=>{
        likePost(userEmail,blogId)
            .then(likedBy => setLikedBy(likedBy));
    }

    useEffect(() => {
        setIsCurrentUserLiked(blog.likedBy.includes(user.email));
    }, [blog, user])

    return (
        <div>
            <p>Likes : {blog.likedBy.length}</p>
            {
                isCurrentUserLiked ?
                    <button
                        onClick={()=>unlikeThisPost(user.email,blog.id)}
                        className='text-red-600'>
                        <FontAwesomeIcon icon={redHeart} />
                    </button>
                    :
                    <button
                        onClick={()=>likeThisPost(user.email,blog.id)}>
                        <FontAwesomeIcon icon={whiteHeart} />
                    </button>
            }
        </div>
    )
}

export default Likes