import * as scoreRepository from '../data/score.js';
import * as studentRepository from '../data/student.js';

// 학생 성적 생성 메소드
export async function create(req, res) {
    // body에 존재하는 num, java, python, c를 선언
    const { num, java, python, c } = req.body;
    // scoreRepository에 getByNum으로 학생 성적을 가져와 foundScore에 선언
    const foundScore = await scoreRepository.getByNum(num);
    // studentRepository getByNum으로 학생 정보를 가져와 foundStudent 선언
    const foundStudent = await studentRepository.getByNum(num);

    // 학생 성적이 담길 경우 이미 존재하는 것이므로 409에러페이지 출력
    if(foundScore){
        return res.status(409).json({ message: `이미 성적이 등록 되어있습니다.` });
    }

    // 학생 정보가 담기지 않을 경우 409에러페이지를 출력
    if(!foundStudent){
        return res.status(409).json({ message: `없는 학생입니다.` });
    }

    // 위 조건을 모두 통과할 경우 값들을 객체로 만들어 insert를 실행
    await scoreRepository.insert({
        num,
        java,
        python,
        c,
        total: java + python + c,
        avg: (java + python + c) / 3
    });

    // 성공시 201페이지를 출력
    res.status(201).json({ message: `성적이 등록 되었습니다.` });
}

// 학생 성적 수정 메소드
export async function modify(req, res) {
    // params에 담겨있는 id를 가져와 num으로 선언
    const num = req.params.id;
    // body에 존재하는 java, python, c를 선언
    const { java, python, c } = req.body;
    // getByNum으로 학생 성적을 가져와 score에 선언
    const score = await scoreRepository.getByNum(num);

    // score에 값이 담기지 않을 경우 404에러페이지를 출력
    if(!score){
        res.status(404).json({ message: '학생 num을 확인해주세요' });
    }
    // score에 값이 담길경우 값들을 객체로 만들어 update를 실행
    else{
        const updated = await scoreRepository.update({
            num,
            java,
            python,
            c,
            total: java + python + c,
            avg: (java + python + c) / 3
        });
        // 성공시에 200페이지에 수정된 값들을 출력
        res.status(200).json(updated);
    }
}

// 학생 성적 삭제 메소드
export async function drop(req, res) {
    // params에 담겨있는 id를 가져와 num으로 선언
    const num = req.params.id;
    // getByNum으로 학생 성적을 가져와 score에 선언
    const score = await scoreRepository.getByNum(num);

    // score에 값이 담기지 않을 경우 404에러페이지를 출력
    if(!score){
        res.status(404).json({ message: '학생 num을 확인해주세요' });
    }
    // score에 값이 담길 경우 학생의 성적이 존재하는 것이므로 삭제
    else{
        await scoreRepository.remove(num);
        res.sendStatus(204);
    }
}