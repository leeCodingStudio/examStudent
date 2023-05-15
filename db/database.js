import { config } from '../config.js';
import SQ from 'sequelize';

// config에서 환경변수를 가져와 저장
const { host, user, database, password } = config.db;

// sequelize에 환경변수들을 넣어 MySQL과 연결하고 시간을 서울 기준으로 설정
export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    logging: false,
    timezone: 'Asia/Seoul'
});