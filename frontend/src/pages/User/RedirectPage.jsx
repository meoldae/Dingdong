import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { userAtom } from '@/atom/UserAtom';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../../api/User';

const RedirectPage = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useRecoilState(userAtom);

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    useEffect(() => {
        if (loginInfo.accessToken) {

            fetchUserInfo(loginInfo.accessToken)
                .then(response => {
                    console.log("요청은 했습니다");
                    console.log(response);
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
                    console.log(error);
                });
            
        }
    }, [loginInfo.accessToken, navigate, setLoginInfo]); 
    
    if (token !== null) {
        setLoginInfo(prevState => ({ ...prevState, accessToken: token }));
    }

    return null;
}

export default RedirectPage;