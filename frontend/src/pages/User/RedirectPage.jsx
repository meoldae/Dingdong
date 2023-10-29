import axios from "axios";
import { useRecoilState } from 'recoil';
import { userAtom } from '@/atom/UserAtom';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useRecoilState(userAtom);

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    if (token !== null) {
        setLoginInfo(prevState => ({ ...prevState, accessToken: token }));

        axios.get(`${import.meta.env.VITE_SERVER_URL}/member/login`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const avatarId = response.data.avatarId;
            const nickname = response.data.nickname;
            const roomId = response.data.roomId;
        
            setLoginInfo(prevState => ({
                ...prevState,
                avatarId: avatarId,
                nickname: nickname,
                roomId: roomId
            }));
        
            navigate("/");
        })
        .catch(error => {
            console.error("API 요청 오류:", error);
        });
    }

    return null;
}

export default RedirectPage;