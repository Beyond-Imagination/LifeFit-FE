'use client'

import axios from "axios"
import { useState } from "react"

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        image: "",
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "image") {
            setFormData({
                ...formData,
                [name]: files[0]
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = new FormData()

        submitData.append("title", formData.title)
        submitData.append("body", formData.body)
        submitData.append("image", formData.image)

        axios({
            method: "post",
            url: "http://localhost:8080/api/community", 
            data: submitData, 
            headers: {
                withCredentials: true,
                "Content-Type": "multipart/form-data"
            }
        })

        setFormData({
            title: "",
            body: "",
            image: "",
        })
    }

    return (
        <div className='w-full rounded-md shadow-md bg-white mb-2 p-3'>
            <h1 className="text-black font-bold text-xl">새 글 작성</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <section className="mt-3">
                    <h3 className="text-black text-sm">제목</h3>
                    <textarea 
                    className="w-full border-2 mt-1 text-black"
                    onChange={handleChange}
                    value={formData.title}
                    required
                    name="title"
                    ></textarea>
                </section>
                <section className="mt-3">
                    <h3 className="text-black text-sm">내용</h3>
                    <textarea 
                    className="w-full h-32 border-2 mt-1 text-black"
                    onChange={handleChange}
                    value={formData.body}
                    required
                    name="body"
                    ></textarea>
                </section>
                <section className="mt-3">
                    <h3 className="text-black text-sm">이미지 업로드</h3>
                    <label htmlFor="image">
                        <div className="mt-1.5 bg-red-500 p-2 text-xs rounded-md w-fit">📷 이미지 선택</div>
                    </label>
                    <input 
                    type="file" 
                    name="image" 
                    id="image" 
                    onChange={handleChange}
                    className="absolute hidden"
                    ></input>
                </section>
                <button type="submit" className="bg-red-500 w-full text-sm rounded-full mt-3 p-2">글 작성</button>
            </form>
        </div>
    )
}

export default CreatePost