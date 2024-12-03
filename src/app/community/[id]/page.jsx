"use client";

import { getCommunityPostsById } from "@/app/api/communityAPI";
import Comment from "@/app/components/detail-components/Comment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useLike from "@/app/hooks/useLike";
import useComment from "@/app/hooks/useComment";
import CommentForm from "@/app/components/detail-components/CommentForm";

const CommunityDetail = () => {
  const param = useParams();
  const [postData, setPostData] = useState({});
  const comments = useComment(param.id);
  const [like, likePost] = useLike();

  useEffect(() => {
    const data = getCommunityPostsById(param.id);
    setPostData(data);
  }, [param]);

  if (!postData) {
    return <div className="text-black">Loading...</div>; // 데이터 로딩 중 UI
  }

  return (
    <div className="w-full rounded-md shadow-md bg-white mb-2 p-3">
      <h1 className="text-black text-2xl font-bold mb-2">{postData.title}</h1>
      <div className="flex items-center mt-1">
        <div className="rounded-full bg-gray-200 size-8 mr-2.5"></div>
        <section className="flex justify-between flex-col">
          <h3 className="text-black font-semibold text-sm">{postData.user}</h3>
          <p className="text-black text-xs">2024-11-30</p>
        </section>
      </div>
      <div className="aspect-square w-full bg-gray-200 mt-2 rounded-md"></div>
      <p className="text-black mt-3 text-sm">{postData.body}</p>
      <section className="flex justify-between mt-4">
        <section className="flex items-center" onClick={likePost}>
          <div className="size-4 mr-1.5 flex items-center justify-center">
            ❤️
          </div>
          <p className="text-red-500 text-xs">{like} 좋아요</p>
        </section>
        <section className="flex item-center">
          <section className="flex item-center">
            <div className="size-4 mr-1 flex items-center justify-center">
              💬
            </div>
            <p className="text-black text-xs">{comments.length} 댓글</p>
          </section>
          <section className="flex item-center ml-3">
            <div className="size-4 mr-1 flex items-center justify-center">
              🚀
            </div>
            <p className="text-black text-xs">공유</p>
          </section>
        </section>
      </section>
      <div className="w-full h-px bg-gray-200 mt-4"></div>
      <section className="mt-4">
        <h2 className="font-bold text-black text-lg mb-2">댓글</h2>
        {comments.map((comment, i) => {
          return <Comment key={i} comment={comment} />;
        })}
        <CommentForm postId={param.id} />
      </section>
    </div>
  );
};

export default CommunityDetail;
