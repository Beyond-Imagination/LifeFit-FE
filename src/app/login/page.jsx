"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StyledInput from "@/app/components/user/StyledInput";
import "@/styles/user/input-form.css";
import { login } from "@/app/api/user/userAPI";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      const token = data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("nickname", data.user.nickname);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <StyledInput
            name="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            name="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">로그인</button>
        </form>
        <div className="bottom-box">
          <span>계정이 없으신가요?</span>
          <a href="/join">회원가입</a>
        </div>
      </div>
    </div>
  );
}
