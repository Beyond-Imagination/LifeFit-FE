"use client";
import React, { useEffect, useState } from "react";
import "@/styles/user/userInfo.css";
import { getUserInfo, updateUserInfo } from "@/app/api/user/userAPI";
import { useRouter } from "next/navigation";

export default function UserInfo(props) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const userId = props.userId;
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      if (userId) {
        router.push(`/profile/${userId}`);
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }

    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo(userId);
        console.log(userData);
        setUser(userData);
        setNickname(userData.nickname);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const data = await updateUserInfo(
        {
          currentPassword: password,
          password: newPassword,
          nickname: nickname,
        },
        userId
      );
      setUser(data);
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
      localStorage.setItem("nickname", data.nickname);
    } catch (error) {
      console.error("Failed to update user info:", error);
    }

    setIsEditing(false);
  };

  return (
    <div className="userInfo-container">
      <div className="nickname-box">
        <p>{nickname}</p>
      </div>
      <div className="userinfo-box">
        {isEditing ? (
          <>
            <form className="update-form">
              <p>이메일</p>
              <input
                style={{ width: "100%" }}
                name="이메일"
                value={user.email}
                readOnly
              />
              <p>닉네임</p>
              <input
                style={{ width: "100%" }}
                name="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <p>현재 비밀번호</p>
              <input
                style={{ width: "100%" }}
                name="현재 비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>새 비밀번호</p>
              <input
                style={{ width: "100%" }}
                name="새 비밀번호"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <p>새 비밀번호 확인</p>
              <input
                style={{ width: "100%" }}
                name="새 비밀번호 확인"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button className="update-btn" onClick={handleSaveClick}>
                저장
              </button>
            </form>
          </>
        ) : (
          <>
            {showSuccessMessage && (
              <div className="success-box">
                프로필이 성공적으로 업데이트 되었습니다.
              </div>
            )}
            <p>
              <b>이메일:</b> {user.email ? user.email : " 이메일 로딩중...🌀"}
            </p>
            <p>
              <b>닉네임:</b>{" "}
              {user.nickname ? user.nickname : " 닉네임 로딩중...🌀"}
            </p>
            <button className="normal-btn" onClick={handleEditClick}>
              프로필 수정
            </button>
          </>
        )}
      </div>
    </div>
  );
}
