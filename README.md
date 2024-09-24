## 💪운동 관련 정보 공유 서비스 HealthGG
![Frame 21](https://github.com/user-attachments/assets/c87f46fb-b798-4970-9146-37aa52fda851)
<br>
### 👉[서비스 주소]( https://healthgg.vercel.app/)
### 👉[노션 주소](https://healthgg.notion.site/HealthGG-2eb7cf34ed20467284b0bfff03de0a0b)
### 👉[포스트맨 주소](https://documenter.getpostman.com/view/26896889/2sAXjM3WwN)
### 👉[피그마 주소](https://www.figma.com/design/3ZZ5wdaVFHllOgWbtwzlef/healthgg?node-id=487-2186&t=A7EQGfK9GqmtgIaf-1)

---


## 🖥프로젝트 아키텍쳐
![Frame 16](https://github.com/user-attachments/assets/94b81832-6a72-434c-b3c4-966b8f3abb75)

---


## 👨‍💻팀원 소개

<div align="center">

<table>
  <tr>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/96641210?v=4" width="200" /></td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/84097192?v=4" width="200" /></td>
  </tr>
  <tr>
    <td align="center"><strong>김용식</strong></td>
    <td align="center"><strong>김한솔</strong></td>
  </tr>
  <tr>
    <td align="center">백엔드</td>
    <td align="center">프론트엔드</td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ystar5008">GitHub</a></td>
    <td align="center"><a href="https://github.com/hansololiviakim">GitHub</a></td>
  </tr>
</table>

</div>


### 👩‍🏫김한솔

#### UI
  - 페이지 : 홈, 검색, 게시글 작성, 게시글 수정, 게시글 상세, 채팅방
  - 공통 컴포넌트 : 게시글 템플릿, 버튼
#### 기능
  - 유저 검색, 게시글 등록 및 수정, 게시글 상세 확인, 댓글 등록, 팔로워 게시글 불러오기, 좋아요 기능
    
### 👨‍🏫김용식

#### API 구현
- 검색 : 운동기구 및 영양소 목록 검색 기능 구현
- 무한스크롤 : 운동 기구 및 영양소 목록 무한스크롤 구현
#### 홈서버 구축
- 클라우드 서비스를 사용하지 않고 호스트 PC에 홈서버 구축
- VMware를 사용하여 개발 배포서버 구축
  
---

## 🛠️개발 환경


#### 프론트엔드
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
#### 백엔드
  ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![ELK](https://img.shields.io/badge/ELK-00B2A9?style=for-the-badge&logo=elasticsearch&logoColor=white)
#### 데이터베이스
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
#### 인프라
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) ![VMware](https://img.shields.io/badge/VMware-5B3FD8?style=for-the-badge&logo=vmware&logoColor=white)
#### 협업툴
  ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FA2B1D?style=for-the-badge&logo=postman&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)


---

## 🚀주요기능

### 커스텀 식단 만들기
👉 목적에 맞는 자신만의 식단을 만들고 공유하거나 엑셀파일로 다운 받을 수 있습니다.
### 프로틴 섭취량 계산기
👉 목적에 맞는 하루 프로틴 섭취량을 계산합니다
### 1RM 계산기
👉 실제로 1RM을 수행하지 않고 수행 횟수 및 수행 중량을 근거로 1RM을 계산합니다
### 커스텀 운동 루틴 만들기
👉 유저가 수행하고 있는 운동 루틴 및 프로그램을 만들고 공유할 수 있습니다.
  
---

## ⚙개발 기술 설명

### React
- 프론트엔드 코드 작성

### Vercel
- 프론트엔드 앱 배포

### NestJS

- TS 및 NestJS 프레임워크의 활용도를 높히기 위해 사용

### ELK

- 검색 기능 구현을 위해 ELK 스택 사용
- DB에 있는 데이터를 like 연산자롤 구현 할 수 있었으나 실시간 검색구현을 위해 ELK스택 사용
- Like 연산사용시 자음 및 모음 처리가 어려움 => ElacticSearch의 형태소 분석기를 사용하여 자음 모음 처리

### Docker

- NestJS 서버, ELK, MySQL을 개별 컨테이너로 실행하고 동일한 네트워크로 묶어 컨테이너간 통신이 가능하도록 설정


### VMware

- 클라우드 서비스 없이 리눅스 서버를 구동하기 위해사용
- 호스트 PC에 개발서버 및 배포서버를 병렬적으로 실행
- 1개의 라우터에 4개의 PC가 연결된 것 처럼 구성

### Git-flow

- Git-flow 전략을 기반으로 production, develop 브랜치와 feature 보조 브랜치를 운용
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
  - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
  - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
  - **Feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

---


## 📃개발 기간 및 작업 관리

### 개발 기간
#### 전체 진행 기간 : 2024-07-14 ~ 2024-09-30

---

## 💣트러블 슈팅 및 이슈



<br>

## 📝페이지별 기능





