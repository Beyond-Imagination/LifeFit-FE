import axios from "axios"

const getCommunityPostsByChunk = async(limit) => {
    // const res = await axios.get(`http://localhost:8080/api/community/chunk?start=${start}&end=${end}`)
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
    console.log(res.data)
    return res.data
}

const getCommunityPostsById = async(id) => {
    // const res = await axios.get(`http://localhost:8080/api/community/${id}`)
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    console.log(res.data)
    return res.data
}

export {
    getCommunityPostsByChunk,
    getCommunityPostsById
}