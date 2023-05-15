# 학생 성적관리 API
- github주소: https://github.com/leeCodingStudio/examStudent

### node_modules 설치
- cmd에서 모듈을 설치

```
npm i
```

### .env 파일 생성
- 직접 .env 파일을 생성하여 내부에 값 설정

```
SERVER_PORT='포트번호'
DB_HOST='호스트'
DB_USER='db사용자명'
DB_DATABASE='스키마명'
DB_PASSWORD='사용자 비밀번호'
```

### exam.sql 실행
- MySQL Workbench에서 exam.sql파일 실행
    - 스키마를 생성하기위한 작업

### 서버 실행
- cmd에서 서버를 실행

```
npm start
```

### postman
- postman.json파일을 postman에서 import
- 각 기능별로 postman 실행