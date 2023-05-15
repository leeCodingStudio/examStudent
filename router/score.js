import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as scoreController from '../controller/score.js';

const router = express.Router();

// 입력받는 값들의 규칙을 설정
const validateCreateScore = [
    body('num').trim().notEmpty().withMessage('num을 입력하세요'),
    body('java').notEmpty().withMessage('JAVA 점수를 입력하세요'),
    body('python').notEmpty().withMessage('Python 점수를 입력하세요'),
    body('c').notEmpty().withMessage('C언어 점수를 입력하세요'),
    validate
]

// 점수 등록
// POST: http://localhost:8080/score/
/*
{
    "num": 학생num,
    "java": java점수,
    "python": python점수,
    "c": c언어 점수
}
*/
router.post('/', validateCreateScore, scoreController.create);

// 점수 수정
// PUT: http://localhost:8080/score/num값
/*
{
    "java": java점수,
    "python": python점수,
    "c": c언어 점수
}
*/
router.put('/:id', scoreController.modify);

// 점수 삭제
// DELETE: http://localhost:8080/score/num값
router.delete('/:id', scoreController.drop);

// router 객체를 export
export default router;