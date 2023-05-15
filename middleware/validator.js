import { validationResult } from 'express-validator'

// validationResult가 생성이 될 경우 규칙을 어긴거 이므로 400에러페이지를 보여주며 안에 값이 안담길 경우는 규칙을 어기지 않은것이므로 그대로 진행
export const validate = (req, res, next) =>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    return res.status(400).json( {message: errors.array()})
}