import SQ from 'sequelize';
import { sequelize } from './database.js';
import { Student } from './student.js';

const DataTypes = SQ.DataTypes;

// score 테이블을 생성
export const Score = sequelize.define(
    'score',
    // 컬럼들의 type과 제약조건을 설정
    {
        java: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        python: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        c: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        score_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    // 시간자동 생성을 막고 테이블명이 복수형으로 변하지 않도록 설정
    { timestamps: false, freezeTableName: true }
);

// 서로 num컬럼으로 1대1 참조 할 수 있도록 외래키를 설정
Student.hasOne(Score, { foreignKey: 'num' });
Score.belongsTo(Student, { foreignKey: 'num' });