import axios from "axios";

const getCommentByPostId = async (postId) => {
  const res = await axios.get(`http://localhost:8080/api/comment/${postId}`);
  // const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?_limit=5`)
  return res.data;
};

export { getCommentByPostId };
