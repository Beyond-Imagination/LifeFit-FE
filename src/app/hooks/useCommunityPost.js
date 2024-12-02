import { useState, useEffect } from 'react'
import useEdgeDetector from "@/app/hooks/useEdgeDetector"
import { getCommunityPostsByChunk } from "@/app/api/communityAPI"

const useCommunityPost = () => {
    const [posts, setPosts] = useState([])
    const isEdge = useEdgeDetector()

    const loadPosts = async() => {
        const fetchData = async() => {
            const newPosts = await getCommunityPostsByChunk(isEdge, isEdge + 5)
            setPosts(() => {
                return [...posts, ...newPosts]
            })
        }
        fetchData()
    }
    
    useEffect(() => {
        loadPosts()
    }, [isEdge])

    return posts
}

export default useCommunityPost