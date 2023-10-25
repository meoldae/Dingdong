import { useRecoilState } from 'recoil';
import { userAtom } from '@/atom/UserAtom';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
    const navigate = useNavigate();
    const [, setLoginInfo] = useRecoilState(userAtom);

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    console.log(token);
    if (token !== null) {
        setLoginInfo(prevState => ({ ...prevState, accessToken: token }));
        navigate('/');
    }

    return null;
}

export default RedirectPage;