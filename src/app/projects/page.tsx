"use client";

import Link from "next/link";
import { Calendar, ThumbsUp, MessageCircle } from "lucide-react";
import {
  getProjectList,
  projectLike,
  ProjectListElementResponse,
} from "@/app/api/projectAPI";
import { useEffect, useState } from "react";
import { useAlert } from "@/app/contexts/AlertContext";

export default function ProjectsPage() {
  const [lastId, setLastId] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectListElementResponse[]>([]);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (projects.length === 0) {
      getProjectList(null, 10).then((response) => {
        setProjects(response.data);
        setLastId(response.data[response.data.length - 1].id);
      });
    }

    let scrollHandler = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        getProjectList(lastId, 10).then((response) => {
          if (response.data.length < 10) {
            window.removeEventListener("scroll", scrollHandler);
          }
          setProjects((prev) => [...prev, ...response.data]);
          setLastId(response.data[response.data.length - 1].id);
        });
      }
    };
    window.addEventListener("scroll", scrollHandler);
  }, []);

  function handleLike(projectId: string) {
    projectLike(projectId)
      .then((response) => {
        if (response.data.isLiked) {
          showAlert("좋아요를 눌렀습니다.", "success");
        } else {
          showAlert("좋아요를 취소했습니다.", "success");
        }
        projects.forEach((project) => {
          if (project.id === projectId) {
            project.likes = response.data.likesCount;
            project.isLiked = response.data.isLiked;
          }
        });
      })
      .catch((error) => {
        console.error(error);
        showAlert("좋아요를 누르지 못했습니다.", "error");
      });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        정부 체육 관련 사업
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <Link
                href={`/projects/${project.id}`}
                className="text-xl font-semibold hover:text-pink-600 block mb-2"
              >
                {project.title}
              </Link>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{project.date}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <div
                  className={`flex items-center ${project?.isLiked ? "text-pink-600 hover:text-pink-700" : ""}`}
                  onClick={() => handleLike(project.id)}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{project.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span>{project.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
