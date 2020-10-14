'use strict';

{
    const question   = document.getElementById('question');
    const choices    = document.getElementById('choices');
    const btn        = document.getElementById('btn');
    const result     = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet  = shuffle([
        {q: '日本一高い山は？', c: ['富士山', 'エベレスト', 'チョモランマ']},
        {q: '日本一高いタワーは？', c: ['スカイツリー', 'エッフェル塔', '福岡タワー']},
        {q: 'プロ野球歴代本塁打記録1位は？', c: ['王貞治', 'バリーボンズ', '板東英二']},
    ]);
    let currentNum = 0;
    let isAnswered;
    let score = 0;


    function shuffle(arr) {
        for (let i   = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {
        if (isAnswered) {
            return;
        }
        isAnswered = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }

        btn.classList.remove('disabled');
    }

    function setQuiz() {
        isAnswered = false;

        question.textContent = quizSet[currentNum].q;

        while(choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'あなたのスコアは？'
        }
    }

    setQuiz();

    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1) {
            result.classList.remove('hidden')
            scoreLabel.textContent = `${quizSet.length}問中${score}問正解`;
            btn.textContent = `${quizSet.length}問中${score}問正解`;
        } else {
            currentNum++;
            setQuiz()
        }
    });
}