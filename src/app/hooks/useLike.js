import { useState } from "react"

const useLike = () => {
    const [like, setLike] = useState(0)
    const [checked, setChecked] = useState(false)
    const likePost = () => {
        if (checked) {
            setLike(like - 1)
            setChecked(!checked)
        } else {
            setLike(like + 1)
            setChecked(!checked)
        }
    }

    return [like, likePost]
}

export default useLike