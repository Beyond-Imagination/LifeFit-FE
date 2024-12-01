import { useState, useEffect } from "react"
import { getAllComment } from "@/app/api/commentAPI"

const useComment = () => {
    const [comments, setComments] = useState([])
    useEffect(() => {
        const fetchComment = async() => {
            const res = await getAllComment()
            console.log(res)
            setComments(res)
        }
        fetchComment()
    }, [])

    return comments
}

export default useComment