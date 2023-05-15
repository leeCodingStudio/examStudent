import SQ from 'sequelize';
import { sequelize } from './database.js';

const DataTypes = SQ.DataTypes;

// student 테이블을 생성
export const Student = sequelize.define(
    'student',
    // 컬럼들의 type과 제약조건을 설정
    {
        num: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        ph: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        regdate: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW
        }
    },
    // 시간자동 생성을 막고 테이블명이 복수형으로 변하지 않도록 설정
    { timestamps: false, freezeTableName: true }
);