import '@/styles/user/styledInput.css';

export default function UserInput({ name,type }) {
    return (
      <>
      <div className="input-box" >
      <p>{name}</p>
      <input type={type}/>
      </div>
      </>
    );
  }