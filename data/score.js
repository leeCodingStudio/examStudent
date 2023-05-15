import { Score } from '../db/score.js';

// num값으로 특정 학생의 성적을 반환
export async function getByNum(num) {
    return Score.findOne({ where: { num } });
}

// score객체를 받아 새로운 학생성적을 생성해주며 생성 할 경우 해당 성적의 num값을 반환
export async function insert(score){
    return Score.create(score).then((data) => data.dataValues.num);
}

// score객체에 담긴 값으로 특정 학생의 성적을 가져와 oldeScore 객체에 담았으며 oldeScore에 score를 일부 값들로 덮어씌워 저장후 수정된 값을 반환
export async function update(score) {
    return Score.findOne({ where: { num: score.num } }).then((oldScore) => {
        oldScore.java = score.java;
        oldScore.python = score.python;
        oldScore.c = score.c;
        oldScore.total = score.total;
        oldScore.avg = score.avg;
        return oldScore.save();
    });
}

// num으로 특정 학생 성적을 가져와 삭제
export async function remove(num){
    return Score.findOne({ where: { num } }).then((score) => {
        score.destroy();
    });
}