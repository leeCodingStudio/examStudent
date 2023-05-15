import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as studentController from '../controller/student.js';

const router = express.Router();

// 입력받는 값들의 규칙을 설정
const validateCreateStudent = [
    body('id').trim().notEmpty().withMessage('학번을 입력하세요'),
    body('name').notEmpty().withMessage('이름을 입력하세요'),
    body('ph').trim().notEmpty().withMessage('연락처를 입력하세요'),
    body('email').isEmail().normalizeEmail().withMessage('이메일 형식으로 입력하세요'),
    body('address').notEmpty().withMessage('주소를 입력하세요'),
    validate
]

// 수정할 값들의 규칙을 설정
const validateUpdateStudent = [
    body('name').notEmpty().withMessage('이름을 입력하세요'),
    body('ph').trim().notEmpty().withMessage('연락처를 입력하세요'),
    body('email').isEmail().normalizeEmail().withMessage('이메일 형식으로 입력하세요'),
    body('address').notEmpty().withMessage('주소를 입력하세요'),
    validate
]

// 학생 등록
// POST: http://localhost:8080/student/
/*
JSON
{
    "id": 학번,
    "name": 이름,
    "ph": 연락처,
    "email": 이메일,
    "address": 주소
}
*/
router.post('/', validateCreateStudent, studentController.create);

// 학생 전체 조회
// GET: http://localhost:8080/student/
router.get('/', studentController.showAll);

// 학번으로 학생 조회
// GET: http://localhost:8080/student/학번(id)
router.get('/:id', studentController.showOne);

// 학생 수정
// PUT: http://localhost:8080/student/num값
/*
{
    "name": 이름,
    "ph": 연락처,
    "email": 이메일,
    "address": 주소
}
*/
router.put('/:id', validateUpdateStudent, studentController.modify);

// 학생 삭제
// DELETE: http://localhost:8080/student/num값
router.delete('/:id', studentController.drop);

// router 객체를 export
export default router;