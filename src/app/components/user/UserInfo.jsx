import '@/styles/user/userInfo.css';

export default function UserInfo(props){

    const userId = props.userId;

        const tempUser={
            email: "user@example.com",
            nickname: "체육매니아"
        }
            
        return(
            <>

            <div className='userInfo-container'>
                <div className="userinfo-box">
                    <p><b>이메일:</b> {tempUser.email}</p>
                    <p><b>닉네임:</b> {tempUser.nickname}</p>
                </div>
                <div className='btn-box'>
                    <button>프로필 수정</button>
                </div>
            </div>
            </>
        )
}