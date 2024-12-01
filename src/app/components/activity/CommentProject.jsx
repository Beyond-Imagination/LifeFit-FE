import { projectLike } from "@/app/api/user/userAPI";
import { useState, useEffect } from "react";
import "@/styles/project/activity.css";

export default function LikeProject({ userId }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectLike(userId);
        setProjects(response);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // const projects = [
  //   {
  //     id: 1,
  //     title: "프로젝트 1",
  //     createdAt: "2021-09-01",
  //   },
  //   {
  //     id: 2,
  //     title: "프로젝트 2",
  //     createdAt: "2021-09-02",
  //   },
  //   {
  //     id: 3,
  //     title: "프로젝트 3",
  //     createdAt: "2021-09-03",
  //   },
  // ];

  return (
    <div>
      <p className="main-title">댓글 단 정부 공고</p>
      {projects.length === 0 ? (
        <p>댓글을 작성한 정부 공고가 없습니다.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="like-project-box">
            <p className="title">{project.title}</p>
            <div className="right-container">
              <p className="icon">💭</p>
              <p className="create-at">{project.createdAt}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
