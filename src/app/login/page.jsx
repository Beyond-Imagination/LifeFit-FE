import StyledInput from '@/app/components/user/StyledInput';
import '@/styles/user/input-form.css';

export default function LoginPage() {
    return (
        <div className='login-container'>
<div className='form-box'>
        <h1>로그인</h1> 
        <form>
            <StyledInput name="이메일" />
            <StyledInput name="비밀번호" type="password"/>
            <button type='submit'>로그인</button>
            </form>
        <div className='bottom-box'>
            <span>계정이 없으신가요?</span>
            <a href='/join'>회원가입</a>
        </div>
        </div>
        </div>
    );
}