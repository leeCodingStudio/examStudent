import express from 'express';
import morgan from 'morgan';
import studentRouter from './router/student.js';
import scoreRouter from './router/score.js';
import { config } from './config.js';
import { sequelize } from './db/database.js';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

// 테이블 별로 router를 구분
app.use('/student', studentRouter);
app.use('/score', scoreRouter);

// 없는 경로일 경우 404 에러페이지
app.use((req, res) => {
    res.sendStatus(404);
});

// 서버에 에러가 발생할 경우 500 에러페이지
app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

// sequelize를 실행하며 server도 config.js에 설정 되어있는 port번호로 실행
sequelize.sync().then(() => {
    const server = app.listen(config.host.port);
});