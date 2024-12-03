"use client";

import { useState } from "react";
import axios from "axios";

const CommentForm = ({ postId }) => {
  const [formData, setFormData] = useState({
    body: "",
    postId: postId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/comment", formData);
  };

  return (
    <section className="mt-3">
      <form onSubmit={handleSubmit}>
        <textarea
          name="body"
          onChange={handleChange}
          value={formData.body}
          className="text-xs border-gray-200 border-solid border-2 w-full h-20 p-2 text-black"
          placeholder="댓글을 입력하세요."
          required
        ></textarea>
        <button
          type="submit"
          className="w-16 bg-red-500 text-xs p-2 rounded-full mt-1 hover:bg-red-300"
        >
          댓글 작성
        </button>
      </form>
    </section>
  );
};

export default CommentForm;
