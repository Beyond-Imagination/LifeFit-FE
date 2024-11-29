import UserInfo from  '@/app/components/user/UserInfo';
import UserImg from  '@/app/components/user/UserImg';
import { User } from 'lucide-react';

export default function ProfilePage(props){
    
    const userId = props.params.id;

    return(
        <div>
            <h1>프로필 페이지</h1>

            {/* 이미지 컴포넌트 */}
            <UserImg userId={userId} />
            {/* 사용자 정보 */}
            <UserInfo userId={userId} />

            {/* 활동내역 */}


        </div>
    )
}