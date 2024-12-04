export default function Comment({ comment }) {
    return (
        <section className="">
            <h3 className="text-sm text-black font-bold">{comment.user}</h3>
            <p className="text-xs text-black mt-1">{comment.body}</p>
            <div className="w-full h-px bg-gray-200 mt-3 mb-3"></div>
        </section>
    )
}