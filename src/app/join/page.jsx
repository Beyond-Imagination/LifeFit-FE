"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StyledInput from "@/app/components/user/StyledInput";
import "../../../styles/user/input-form.css";
import { register } from "@/app/api/user/userAPI";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await register(email, password, nickname);
      router.push("/login");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response.data.error.includes("email")) {
        alert("이미 가입된 이메일입니다.");
      } else if (error.response.data.error.includes("nickname")) {
        alert("이미 사용 중인 닉네임입니다.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <StyledInput
            name="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            name="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <StyledInput
            name="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledInput
            name="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">회원가입</button>
        </form>
        <div className="bottom-box">
          <span>이미 계정이 있으신가요?</span>
          <a href="/login">로그인</a>
        </div>
      </div>
    </div>
  );
}
