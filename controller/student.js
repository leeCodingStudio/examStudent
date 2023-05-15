import * as studentRepository from '../data/student.js';
import * as scoreRepository from '../data/score.js';

// 학생 정보 생성 메소드
export async function create(req, res) {
    // body에 존재하는 id, name, ph, email, address를 선언
    const { id, name, ph, email, address } = req.body;
    // getById로 학번 검색을 하여 결과값을 found에 선언
    const found = await studentRepository.getById(id);

    // found에 값이 담길 경우 이미 존재하는 학번이라고 알리며 409 에러페이지 발생
    if(found){
        return res.status(409).json({ message: `${id}학번 학생은 이미 존재합니다.` });
    }

    // 위에 검사를 무사히 통과 할 경우 값들을 객체로 만들어 insert를 실행
    await studentRepository.insert({
        id,
        name,
        ph,
        email,
        address
    });
    // 성공시에 201페이지를 출력
    res.status(201).json({ message: `${name} 학생이 등록 되었습니다.` });
}

// 학생 전체 조회 메소드
export async function showAll(req, res) {
    // datas에 getAll반환값을 선언
    const datas = await studentRepository.getAll();
    // 200페이지에 학생 전체 정보를 담은 datas를 출력
    res.status(200).json(datas);
}

// 학생 검색 메소드
export async function showOne(req, res) {
    // params에 담겨있는 id를 가져와 id로 선언
    const id = req.params.id;
    // getById로 학번 검색을 하여 반환값을 data에 선언
    const data = await studentRepository.getById(id);

    // data에 값이 담길 경우에 200페이지에 학생 정보를 담은 data를 출력
    if(data){
        res.status(200).json(data);
    }
    // data에 값이 안담길 경우에는 해당 학번이 없는 것이므로 404에러 페이지를 출력
    else{
        res.status(404).json({ message: `${id}학번은 존재하지 않습니다.` })
    }
}

// 학생 정보 수정 메소드
export async function modify(req, res) {
    // params에 담겨있는 id를 가져와 num으로 선언
    const num = req.params.id;
    // body에 존재하는 name, ph, email, address를 선언
    const { name, ph, email, address } = req.body;
    // getByNum으로 학생 정보를 가져와 student에 선언
    const student = await studentRepository.getByNum(num);
    
    // student에 값이 담기지 않을 경우 404에러페이지를 출력
    if(!student){
        res.status(404).json({ message: '학생 num을 확인해주세요' });
    }
    // student에 값이 담길경우 값들을 객체로 만들어 update를 실행
    else{
        const updated = await studentRepository.update({
            num,
            name,
            ph,
            email,
            address
        });
        // 성공시에 200페이지에 수정된 값들을 출력
        res.status(200).json(updated);
    }
}

// 학생 정보 삭제 메소드
export async function drop(req, res) {
    // params에 담겨있는 id를 가져와 num으로 선언
    const num = req.params.id;
    // studentRepository에 getByNum으로 학생 정보를 가져와 student에 선언
    const student = await studentRepository.getByNum(num);
    // scoreRepository에 getByNum으로 학생 성적을 가져와 score에 선언
    const score = await scoreRepository.getByNum(num);

    // student에 값이 담기지 않을 경우 404에러페이지를 출력
    if(!student){
        res.status(404).json({ message: '학생 num을 확인해주세요' });
    }
    else{
        // score에 값이 담길 경우 학생의 성적이 존재하는 것이므로 성적을 먼저 삭제
        if(score){
            await scoreRepository.remove(num);
        }
        // 이후 학생 정보를 삭제 후 204페이지 출력
        await studentRepository.remove(num);
        res.sendStatus(204);
    }
}