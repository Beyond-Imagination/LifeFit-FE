import { Calendar, ThumbsUp, MessageCircle } from "lucide-react";

async function getProjectData(id: string) {
  // 임시 데이터
  return {
    id,
    title: "2023년 생활체육 지원 사업",
    date: "2023-06-01",
    content:
      "이 사업은 지역 주민들의 건강 증진과 삶의 질 향상을 위해 다양한 생활체육 프로그램을 지원합니다. 지역 체육시설 개선, 전문 강사 지원, 체육 용품 지원 등이 포함됩니다.",
    likes: 15,
    comments: [
      {
        id: 1,
        user: "체육매니아",
        content:
          "정말 좋은 사업이네요! 우리 동네에도 이런 지원이 있으면 좋겠어요.",
      },
      {
        id: 2,
        user: "헬스왕",
        content: "체육시설 개선이 시급해요. 이 사업으로 개선되길 바랍니다.",
      },
    ],
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectData(params.id);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{project.date}</span>
        </div>
        <div className="mb-6">
          {project.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Project image ${index + 1}`}
              className="w-full mb-4 rounded-lg"
            />
          ))}
        </div>
        <p className="text-gray-700 mb-6">{project.content}</p>
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center text-pink-600 hover:text-pink-700">
            <ThumbsUp className="w-5 h-5 mr-1" />
            <span>{project.likes} 관심있어요</span>
          </button>
          <div className="flex items-center text-gray-600">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span>{project.comments.length} 댓글</span>
          </div>
        </div>
        <div className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">댓글</h2>
          {project.comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 pb-4 border-b last:border-b-0"
            >
              <p className="font-semibold">{comment.user}</p>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
          <form className="mt-4">
            <textarea
              placeholder="댓글을 입력하세요..."
              className="w-full p-2 border rounded"
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition duration-300"
            >
              댓글 작성
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
