import { useState, useEffect } from 'react'
import useEdgeDetector from "@/app/hooks/useEdgeDetector"
import { getCommunityPostsByChunk } from "@/app/api/communityAPI"

const useCommunityPost = () => {
    const [limit, setLimit] = useState(10)
    const isEdge = useEdgeDetector()

    const loadPosts = async() => {
        const fetchData = async() => {
            const newPosts = await getCommunityPostsByChunk(limit)
            setPosts(newPosts)
            setLimit(limit + 5)
        }
        fetchData()
    }
    const [posts, setPosts] = useState([])
    useEffect(() => {
        loadPosts()
    }, [isEdge])

    return posts
}

export default useCommunityPost