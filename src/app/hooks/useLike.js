import axios from "axios"
import { useState } from "react"

const useLike = (initLike, postId) => {
    const [like, setLike] = useState(initLike)
    const [checked, setChecked] = useState(false)
    const likePost = () => {
        setChecked(prev => !prev)
        checked ? setLike(prev => prev - 1) : setLike(prev => prev + 1)
        axios.put("http://localhost:8080/api/community/like", 
            {
                postId: postId,
                likes: checked ? like - 1 : like + 1
            }
        )
    }

    return [like, likePost]
}

export default useLike