import CommunityCardContent from "./CommunityCardContent"
import Link from "next/link"

export default function CommunityCard({ post }) {
    return (
        <article className="w-full rounded-md shadow-md bg-white mb-2">
            <div className="p-3 flex items-center">
                <section className="rounded-full bg-gray-200 size-8 mr-2.5"></section>
                <h3 className="text-black font-semibold text-sm">{post.user}</h3>
            </div>
            <Link href={`/community/${post._id}`}>
                <div className="aspect-square w-full bg-gray-200"></div>
            </Link>
            <CommunityCardContent post={post}/>
        </article>
    )
}