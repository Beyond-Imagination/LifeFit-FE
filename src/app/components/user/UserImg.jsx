import '@/styles/user/userImg.css';

export default function UserImg(props){
    const userId = props.userId;
    const nickname = "체육매니아";

    const tempUser={
        img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    }
        
    return(
        <>
        <div className='userImg-container'>
            <img src={tempUser.img} alt="userImg" />
            <p>{nickname}</p>
        </div>
        </>
    )
}