import axios from "axios"

const getAllComment = async() => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?_limit=5`)
    console.log(res.data)
    return res.data
}

export { 
    getAllComment
}