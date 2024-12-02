import { useState, useEffect } from "react";
import { projectLike } from "@/app/api/user/userAPI";
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
      <p className="main-title">관심 있는 정부 공고</p>
      {projects.length === 0 ? (
        <p>관심 있는 글이 없습니다</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="like-project-box">
            <p className="title">{project.title}</p>
            <div className="right-container">
              <p className="icon">👍</p>
              <p className="create-at">{project.createdAt}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
