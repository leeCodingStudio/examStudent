import { Student } from '../db/student.js';
import { Score } from '../db/score.js';
import { Sequelize } from 'sequelize';

// 출력을 해줄 때 student테이블과 score테이블을 join하기 위한 객체
const INCLUDE_STUDENT = {
    attributes: [
        // 평균 점수로 각각 석차를 함께 출력
        [Sequelize.literal(`RANK() OVER (ORDER BY score.avg DESC)`), 'rank'],
        'num',
        'id',
        'name',
        'ph',
        'email',
        'address',
        'regdate',
        // score테이블의 컬럼을 join
        [Sequelize.col('score.java'), 'java'],
        [Sequelize.col('score.python'), 'python'],
        [Sequelize.col('score.c'), 'c'],
        [Sequelize.col('score.total'), 'total'],
        [Sequelize.col('score.avg'), 'avg'],
        [Sequelize.col('score.score_date'), 'score_date']
    ],
    include: {
        // join할 테이블을 설정
        model: Score,
        attributes: []
    }
}

// 평균점수로 내림차순 정렬 하고 만약 평균 점수가 같을 경우 학번으로 내림차순 정렬
const ORDER_DESC = {
    order: [['avg', 'DESC'], ['id', 'DESC']]
}

// student객체를 받아 새로운 학생정보를 생성해주며 생성 할 경우 해당 학생의 num값을 반환
export async function insert(student){
    return Student.create(student).then((data) => data.dataValues.num);
}

// 모든 학생 정보를 위에 선언한 join형태로 반환해주며 정렬
export async function getAll(){
    return Student.findAll({ ...INCLUDE_STUDENT, ...ORDER_DESC});
}

// 학번으로 검색한 학생의 정보를 위에 선언한 join형태로 반환
export async function getById(id){
    return Student.findOne({
        where: { id },
        ...INCLUDE_STUDENT
    });
}

// pk값인 num으로 검색한 학생정보를 반환
export async function getByNum(num){
    return Student.findByPk(num);
}

// student객체에 담긴 값으로 특정 학생의 정보를 가져와 oldeStudent 객체에 담았으며 oldstudent에 student를 일부 값들로 덮어씌워 저장후 수정된 값을 반환
export async function update(student){
    return Student.findByPk(student.num).then((oldStudent) => {
        oldStudent.name = student.name;
        oldStudent.ph = student.ph;
        oldStudent.email = student.email;
        oldStudent.address = student.address;
        return oldStudent.save();
    });
}

// num으로 특정 학생 정보를 가져와 삭제
export async function remove(num){
    return Student.findByPk(num).then((student) => {
        student.destroy();
    });
}