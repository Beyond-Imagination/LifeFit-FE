import { projectLike } from "@/app/api/projectAPI";
import { useState, useEffect } from "react";
import "@/styles/project/activity.css";

export default function LikeCommunity({ userId }) {
  const communities = [
    {
      id: 1,
      title: "커뮤니티 글 1",
      createdAt: "2021-09-01",
    },
    {
      id: 2,
      title: "커뮤니티 글 2",
      createdAt: "2021-09-02",
    },
    {
      id: 3,
      title: "커뮤니티 글 3",
      createdAt: "2021-09-03",
    },
  ];

  return (
    <>
      <div>
        <p className="main-title">좋아요 한 커뮤니티 글</p>
        {communities.map((community) => (
          <div key={community.id} className="like-project-box">
            <p className="title">{community.title}</p>
            <div className="right-container">
              <p className="icon">♥️</p>
              <p className="create-at">{community.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
