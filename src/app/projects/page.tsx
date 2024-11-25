import Link from "next/link";
import { Calendar, ThumbsUp, MessageCircle } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "2023년 생활체육 지원 사업",
    date: "2023-06-01",
    likes: 15,
    comments: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "청소년 스포츠 활동 지원 프로그램",
    date: "2023-06-15",
    likes: 23,
    comments: 8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "지역 스포츠 클럽 육성 사업",
    date: "2023-07-01",
    likes: 18,
    comments: 3,
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function ProjectsPage() {
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
                <div className="flex items-center">
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
