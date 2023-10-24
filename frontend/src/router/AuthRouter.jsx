// 참고자료 : https://github.com/ParkSeYun98/DailyLab/blob/master/frontend/src/router/AuthRoute.tsx

// 장호에게.. 남기는 예비역 병장 준형이의 로그인 로직 정리
// AuthRouter는 토큰 여부를 판단해서 이동시켜주는 Router라고 생각하면 됨.
// AuthRouter가 필요한 이유 : 1. 로그인 여부에 따라 갈 수 있는 페이지가 달라져야함. (로그인이 안되어있다면 로그인 페이지로! 로그인이 되어있다면 메인페이지로!)
// 즉, 이동 URL은 /로 같지만 로그인 여부에 따라 사용자에게 보여지는 페이지는 달라져야한다!!
// 따라서 AppRouter에 로그인 여부에 따라 라우터를 약간 변경해줘야함!! (모르겠다면 위의 참고자료 AppRouter를 참고할 것!!)

// oauth2/redirect라는 url로 넘어는 것에 대한 처리
// 사용자의 여부에 따라 회원가입 혹은 redirect, 두 가지의 url이 주어짐.
// signup(회원가입)으로 오는 리다이렉트는 내가 처리했어!!
// 너가 처리해야할 부분은 oauth2/redirect로 넘어오는 것에 대한 처리다.
// 해당 부분에 대해 참고할 만한 REF은 PEEKPICK 파일의 Redirect.jsx 파일이나 지금 작업하는 frontend/src/pages/User/SignUp.jsx를 참고하면 편할듯!
// 해당 부분을 보면 window.location 뭐시기저시기로 https~~링크 읽어서 거기서 필요한 정보 가져오는데 아마 token(?) 가져오면 와서 localStorage에 박으면 될듯하다.

// 위의 과정을 충실히 이행한다면 로그인 로직에는 문제가 없을 것으로 판단 됨.
// 혹시라도 모르는 부분이 생긴다면 chatGPT와 충분한 구글링을 통해 해결해 나가길 바람.
// 그럼 안녕~~
