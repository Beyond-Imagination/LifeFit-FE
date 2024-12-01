'use client'

import { getCommunityPostsById } from "@/app/api/communityAPI"
import Comment from "@/app/components/detail-components/Comment"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import useLike from "@/app/hooks/useLike"
import useComment from "@/app/hooks/useComment"

const CommunityDetail = () => {
    


	const param = useParams(); // useParams를 여기서 호출

    const [postData, setPostData] = useState();

    useEffect(() => {
        if (param?.id) { // param.id가 있는 경우에만 실행
            getCommunityPostsById(param.id).then((res) => {
                setPostData(res); // 비동기 데이터 설정
            }).catch((err) => {
                console.error(err); // 에러 로깅
            });
        }
    }, [param]);


    const [like, likePost] = useLike()
    const comments = useComment()
   

    if (!postData) {
        return <div className="text-black">Loading...</div>; // 데이터 로딩 중 UI
    }

    return ( 
        <div className='w-full rounded-md shadow-md bg-white mb-2 p-3'>
            <h1 className='text-black text-2xl font-bold mb-2'>{postData.title}</h1>
            <div className="flex items-center mt-1">
                <div className="rounded-full bg-gray-200 size-8 mr-2.5"></div>
                <section className='flex justify-between flex-col'>
                    <h3 className="text-black font-semibold text-sm">{postData.userId}</h3>
                    <p className='text-black text-xs'>2024-11-30</p>
                </section>
            </div>
            <div className="aspect-square w-full bg-gray-200 mt-2 rounded-md"></div>
            <p className='text-black mt-3 text-sm'>
                {postData.body}
            </p>
            <section className='flex justify-between mt-4'>
                <section className='flex items-center' onClick={likePost}>
                    <div className='size-4 mr-1.5 flex items-center justify-center'>❤️</div>
                    <p className='text-red-500 text-xs'>{like} 좋아요</p>
                </section>
                <section className='flex item-center'>
                    <section className='flex item-center'>
                        <div className='size-4 mr-1 flex items-center justify-center'>💬</div>
                        <p className='text-black text-xs'>{comments.length} 댓글</p>
                    </section>
                    <section className='flex item-center ml-3'>
                        <div className='size-4 mr-1 flex items-center justify-center'>🚀</div>
                        <p className='text-black text-xs'>공유</p>
                    </section>
                </section>
            </section>
            <div className='w-full h-px bg-gray-200 mt-4'></div>
            <section className='mt-4'>
                <h2 className='font-bold text-black text-lg mb-2'>댓글</h2>
                {comments.map((comment, i) => {
                    return <Comment key={i} comment={comment}/>
                })}
                <section className='mt-3'>
                    <textarea className='text-xs border-gray-200 border-solid border-2 w-full h-20 p-2 text-black' placeholder='댓글을 입력하세요.'></textarea>
                    <button className='w-16 bg-red-500 text-xs p-2 rounded-full mt-1 hover:bg-red-300'>댓글 작성</button>
                </section>
            </section>
        </div>
    )
}

export default CommunityDetail