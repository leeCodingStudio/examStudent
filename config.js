import dotenv from 'dotenv';

// .env파일에 있는 환경변수를 호출
dotenv.config();

// 환경 변수를 설정해주는 메소드
function required(key, defaultvalue = undefined) {

    // value에 key값인 환경변수를 저장하며 만약 key가 없을 경우 defaultvalue를 저장
    const value = process.env[key] || defaultvalue;

    // 위에서 저장을 아무것도 하지 못할 경우 에러를 발생
    if(value == null) {
        throw new Error(`key ${key} is undefined`);
    }
    
    // 정상 적으로 value값이 저장될 경우 반환
    return value;
}

// 다른 파일에서 환경 변수를 가져다 사용할 수 있도록 객체에 저장하여 export
export const config = {
    host: {
        port: parseInt(required('SERVER_PORT', 8080))
    },
    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        database: required('DB_DATABASE'),
        password: required('DB_PASSWORD')
    }
}