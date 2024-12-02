import useComment from "@/app/hooks/useComment"
import useLike from "@/app/hooks/useLike"

export default function CommunityCardContent({ post }) {
    const comments = useComment(post._id)
    const [like, likePost] = useLike(post.likes, post._id)

    return (
        <div className="p-3">
            <section className="flex">
                <div className="size-5 mr-1.5 flex items-center justify-center" onClick={likePost}>❤️</div>
                <div className="size-5 mr-1.5 flex items-center justify-center">💬</div>
                <div className="size-5 mr-1.5 flex items-center justify-center">🚀</div>
            </section>
            <p className="text-black text-xs font-semibold mt-2">{like} likes</p>
            <p className="text-gray-400 text-xs mt-0.5">View all {comments.length} comments</p>
        </div>
    )
}