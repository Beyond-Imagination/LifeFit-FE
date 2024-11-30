"use client";
import UserInfo from "@/app/components/user/UserInfo";
import UserImg from "@/app/components/user/UserImg";

import { logout, deleteUser } from "@/app/api/user/userAPI";

export default function ProfilePage(props) {
  const userId = props.params.id;

  const handleDeleteUserClick = async () => {
    console.log("회원탈퇴 요청");
    console.log("userId", userId);
    await deleteUser(userId);
    logout();
  };
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      {/* 이미지 컴포넌트 */}
      <UserImg userId={userId} />
      {/* 사용자 정보 */}
      <UserInfo userId={userId} />

      {/* 활동내역 */}
      <br />
      <p style={{ fontSize: "25px", fontWeight: "bold" }}>활동내역</p>

      {/* 회원탈퇴 버튼 */}
      <button
        onClick={handleDeleteUserClick}
        style={{
          width: "100%",
          backgroundColor: "#D72222",
          borderRadius: "20px",
          height: "30px",
          color: "white",
          margin: "50px 0",
        }}
      >
        회원탈퇴
      </button>

      {/* 임시 로그아웃 버튼*/}
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
