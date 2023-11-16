# :love_letter: 딩동! 편지왔어요. 딩동! 놀러왔어요. :house:
<div align="center">
    <img src="https://github.com/Semibro/Semibro/assets/71372469/16e22552-e8a1-4646-bf49-71bcfed6471e" width="300px"/>
</div>  
<br />

## 목차
1. [프로젝트 개요](#프로젝트-소개) 
2. [성과](#성과) 
3. [기능](#기능)  
4. [마케팅](#마케팅)
5. [개발 환경 및 기술 스택](#개발-환경-및-기술-스택) 
6. [프로젝트 산출물](#프로젝트-산출물) 
7. [팀원](#팀원)
<br />

## 프로젝트 개요
- SSAFY 9기 2학기 자율 프로젝트 <br/>
- 2023.10.10 ~ 2023.11.17 (39일)
<br />

## 성과
- 운영 기간: 2023.11.02 ~ 2023.11.17 (**16일**)
- 발생 이벤트 수: 약 **60,000**회+
- 총 사용자 수: 약 **1,000**명+ (_Google Analytics 기준_)
<br />

## 기능

### 딩동 마을 

- 나의 방, 우체통, 우체국, 주민 방, 딩동 스코어 보드, 딩동 광장으로 이동 할 수 있습니다.

### 나의 방

**방 꾸미기**
- 다양한 카테고리의 가구들을 통해 방을 꾸밀 수 있습니다.
- 벽지와 조명 색을 바꿔 자신만의 개성을 표현할 수 있습니다.
<img src="etc/assets/RoomDecorate.gif" width="300px"/><br/>

**공유하기**
- 현재 방의 모습을 담은 이미지를 저장하거나 방 url과 함께 SNS로 공유할 수 있습니다.

**방명록**
- 방에 방문한 사람들의 방명록을 확인, 신고 할 수 있습니다.

**이웃**
- 이웃 목록을 통해 이웃의 방에 방문학거나, 이웃을 취소 할 수 있습니다.

**좋아요**
- 나의 방에 받은 좋아요 수를 확인할 수 있습니다.

### 편지함

- 집 앞 편지함에서 주민들이 보낸 편지를 확인 할 수 있습니다.
<img src="etc/assets/ReceiveLetter.gif" width="300px"/><br/>

### 우체국

- 딩동 주민들의 닉네임을 검색하여 우표를 선택 후 의미를 담은 편지를 보낼 수 있습니다.
<img src="etc/assets/SendLetter.gif" width="300px"/><br/>

### 주민의 방

- 주민의 방을 랜덤으로 방문 할 수 있습니다.
- 방문한 방에서 좋아요, 방명록을 남기거나 이웃 신청을 할 수 있습니다.

### 딩동 스코어보드

**방꾸왕**
- 현 시점 기준 가장 많이 좋아요를 받은 주민을 확인하고 방을 방문할 수 있습니다.

**인기왕**
- 현 시점 기준 가장 많은 편지를 받은 주민을 확인하고 방을 방문할 수 있습니다.

**소통왕** 
- 현 시점 기준 가장 많이 편지를 보낸 주민을 확인하고 방을 방문할 수 있습니다.

### 딩동 광장

- 광장에서 다양한 사람들을 만나 실시간으로 소통할 수 있습니다.
- 채팅, 춤추기, 기뻐하기, 슬퍼하기 등의 상호작용이 가능합니다.
<img src="etc/assets/Dance.gif" width="300px"/><br/>

### 실시간 알람

- 실시간 알람을 통해 나에게 온 편지, 나에게 온 이웃요청 등을 알 수 있습니다.
<img src="etc/assets/Alarm.gif" width="300px"/><br/>

### 신고하기

- 나에게 온 편지, 내 방에 남겨진 방명록의 내용 중 부적절한 내용이 포함된 편지/방명록에 대해서 신고를 할 수 있습니다.

### 문의하기

- 문의하기를 통해 궁금한 점을 문의하거나 개선할 점을 보낼 수 있습니다.
<br />

## 마케팅

### 우표 유형 테스트

### 공식 SNS 운영
<br />


## 개발 환경 및 기술 스택
| FrontEnd                | BackEnd                         | DB                    | Infra                     | 협업툴    |
| ----------------------- | ------------------------------- | --------------------- |-------------------------- | -------- |
| React 18.2.0            | Java : Open JDK 17.0.9          | AWS RDS (MySQL 8.0.33)| AWS EC2 (Ubuntu 20.04 LTS)| GitLab   |
| Recoil 0.7.7            | Spring Boot 2.7.17              | Redis 7.2.2           | Nginx 1.18.0              | Jira     |
| Axios 1.4.0             | Spring : 5.3.30                 |                       | Docker 24.0.6             | Notion   |
| CSS3                    | SpringSecurity : 5.7.11         |                       | Jenkins 2.414.3           | figma    |
| HTML5                   | Gradle : 8.3                    |                       | SonarQube 10.2.1          | Postman  |
| npm 9.6.7               | jjwt: 0.9.1                     |                       | Grafana                   |          |
| JavaScript ES6          | Springfox: 3.0.0                |                       | Prometheus                |          |
| Three.js 0.157.0        | SockJS Client: 1.5.1            |                       |                           |          |
| Vite 4.4.5              | Stomp WebSocket: 2.3.4          |                       |                           |          |

## 프로젝트 산출물 
<details>
    <summary>화면 정의서 & 와이어프레임</summary>
    <img src="https://github.com/Semibro/Semibro/assets/71372469/a95a505c-6c16-4232-a365-cd7fca7a3e8c"/>
    <img src="https://github.com/Semibro/Semibro/assets/71372469/b378d837-dd32-4e89-a96f-0714f6cba22a"/>
    <img src="https://github.com/Semibro/Semibro/assets/71372469/81a5b2df-85f9-4ff2-b7e8-c1cd50ba93d2"/>
    <img src="https://github.com/Semibro/Semibro/assets/71372469/af7476a9-f174-4d46-ab09-90e6ee871ff0"/>
</details>  
<details>
    <summary>요구사항 정의서</summary>
    <img src="https://github.com/Semibro/Semibro/assets/71372469/d4493b73-2180-4d20-9951-4a4de9b98199"/>
</details>  
<details>
    <summary>시스템 아키텍처</summary>
    <img src="https://github.com/Semibro/Semibro/assets/71372469/e4dc1162-d4d5-4eee-bdf0-7dfd1ab7064a"/>
</details>  
<details>
    <summary>ERD</summary>
    <img src="https://github.com/Semibro/Semibro/assets/71372469/5489138b-a385-4863-9042-4f58d0dd536d"/>
</details> 
<details>
    <summary>API 명세서</summary>
    [Swagger](https://ding-dong.kr/api/swagger-ui/index.html) <br/>
    <img src="https://github.com/Semibro/Semibro/assets/71372469/a3ab7ae3-2f77-4b50-92ee-0f5d52a42b96"/>
</details>  

## 팀원
<table>
    <tr>
        <td height="140px" align="center"> 
            <img src="https://avatars.githubusercontent.com/Dayoung1014" width="140px" /> 
        </td>
        <td height="140px" align="center">  
            <img src="https://avatars.githubusercontent.com/97Kzone" width="140px" /> </td>
        </td>
        <td height="140px" align="center">
            <img src="https://avatars.githubusercontent.com/KyongBeom" width="140px" /> </td>
        </td>
        <td height="140px" align="center"> 
            <img src="https://avatars.githubusercontent.com/KJH0406" width="140px" /> </td>
        </td>
        <td height="140px" align="center">
            <img src="https://avatars.githubusercontent.com/Semibro" width="140px" /> </td>        
        </td>
        <td height="140px" align="center">
            <img src="https://avatars.githubusercontent.com/meoldae" width="140px" /> </td>
        </td>
    </tr>
    <tr>
        <td align="center"> <a href="https://github.com/Dayoung1014"> 이다영 </a></td>
        <td align="center"> <a href="https://github.com/97Kzone"> 강동표 </a></td>
        <td align="center"> <a href="https://github.com/KyongBeom"> 김용범 </a> </td>
        <td align="center"> <a href="https://github.com/KJH0406"> 김장호 </a> </td>
        <td align="center"> <a href="https://github.com/Semibro"> 김준형 </a></td>
        <td align="center"> <a href="https://github.com/meoldae"> 전준영 </a></td>
    </tr>
    <tr>
        <td align="center">Leader</td>
        <td align="center">Backend</td>
        <td align="center">Frontend</td>
        <td align="center">Frontend</td>
        <td align="center">Frontend</td>
        <td align="center">Backend</td>
    </tr>
</table>
 
