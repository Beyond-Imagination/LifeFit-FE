import { useState, useEffect } from "react";
import { getCommentByPostId } from "@/app/api/commentAPI";

const useComment = (postId) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComment = async (postId) => {
      const res = await getCommentByPostId(postId);
      setComments(res);
    };
    fetchComment(postId);
  }, []);

  return comments;
};

export default useComment;
