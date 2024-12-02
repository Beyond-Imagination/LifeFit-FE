"use client";

import { Calendar, ThumbsUp, MessageCircle } from "lucide-react";
import {
  createComment,
  getProjectDetail,
  ProjectDetailResponse,
  projectLike,
} from "@/app/api/projectAPI";
import { useAlert } from "@/app/contexts/AlertContext";
import React, { useEffect, useState } from "react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { showAlert } = useAlert();
  const [project, setProject] = useState<ProjectDetailResponse>();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (projectId) {
      getProjectDetail(projectId).then((response) => {
        setProject(response.data);
      });
    } else {
      params.then(({ id }) => {
        setProjectId(id);
      });
    }
  }, [projectId]);

  function handleLike() {
    if (projectId) {
      projectLike(projectId)
        .then((response) => {
          if (response.data.isLiked) {
            showAlert("좋아요를 눌렀습니다.", "success");
          } else {
            showAlert("좋아요를 취소했습니다.", "success");
          }
          setProject((prev) => {
            if (prev) {
              return {
                ...prev,
                likes: response.data.likesCount,
                isLiked: response.data.isLiked,
              };
            }
            return prev;
          });
        })
        .catch((error) => {
          console.error(error);
          showAlert("좋아요를 누르지 못했습니다.", "error");
        });
    }
  }

  function handleComment() {
    if (projectId) {
      createComment(projectId, commentContent)
        .then(() => {
          setCommentContent("");
          getProjectDetail(projectId).then((response) => {
            setProject((prev) => {
              if (prev) {
                return { ...prev, comments: response.data.comments };
              }
              return prev;
            });
          });
          showAlert("댓글을 작성했습니다.", "success");
        })
        .catch((error) => {
          console.error(error);
          showAlert("댓글을 작성하지 못했습니다.", "error");
        });
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{project?.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{project?.date}</span>
        </div>
        <div className="mb-6">
          {project?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Project image ${index + 1}`}
              className="w-full mb-4 rounded-lg"
            />
          ))}
        </div>
        <p className="text-gray-700 mb-6">{project?.content}</p>
        <div className="flex items-center justify-between mb-6">
          <button
            className={`flex items-center ${project?.isLiked ? "text-pink-600 hover:text-pink-700" : ""}`}
            onClick={handleLike}
          >
            <ThumbsUp className="w-5 h-5 mr-1" />
            <span>{project?.likes} 관심있어요</span>
          </button>
          <div className="flex items-center text-gray-600">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span>{project?.comments.length} 댓글</span>
          </div>
        </div>
        <div className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">댓글</h2>
          {project?.comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 pb-4 border-b last:border-b-0"
            >
              <p className="font-semibold">{comment.user}</p>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
          <textarea
            placeholder="댓글을 입력하세요..."
            value={commentContent}
            className="w-full p-2 border rounded"
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button
            className="mt-2 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition duration-300"
            onClick={handleComment}
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
}
