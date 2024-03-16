import { Dispatch, SetStateAction, useState } from "react";
import { BLACK_TAG, BLACK_BUTTON } from "../../../constants/tailwind-classes";

type UseStatePairs = {
    tags : string[],
    setTags : Dispatch<SetStateAction<string[]>>       
}

const TagsBar = ({tags, setTags}: UseStatePairs) => {
    const [tag, setTag] = useState("");

    const handleAddTag = () => {
        setTags([...tags, tag])
        setTag("");
    }

    const handleRemoveTag = (tagName: string) => {
        setTags(tags.filter(singleTag => singleTag !== tagName))
    }

    return (
        <section className='flex p-4 gap-2'>
            <h3 className='text-xl'>Tags:</h3>
            {
                tags.map((tagName, i) => {
                    return (
                        <span className={`${BLACK_TAG}`} key={i}>
                            {tagName} <button onClick={() => handleRemoveTag(tagName)}>x</button>
                        </span>
                    )
                })
            }
            <input className='border-2 border-slate-300 outline-none rounded-lg p-1'
                onChange={(e) => setTag(e.target.value.trim().toLowerCase())}
                value={tag} />
            <button className={`${BLACK_BUTTON}`} onClick={handleAddTag}>Add</button>
        </section>
    )
}

export default TagsBar