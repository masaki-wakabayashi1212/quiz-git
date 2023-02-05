(function(){
    'use strict';

    const quizimage = document.getElementById('quizimage');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scorelabel = document.querySelector('#result > p');
    
    //以下の配列に画像の保存先パスを組み込む？
    const quizset = [
        {n:'1問目',q:'what is a?',a:['A','B','C'],e:'正解は、Aです',img:'<img src="./signquizimage/IMG_1173.jpg">'},
        {n:'2問目',q:'what is b?',a:['B','A','C'],e:'正解は、Bです',img:'<img src="./signquizimage/IMG_0423.jpg">'},
        {n:'3問目',q:'what is c?',a:['C','B','A'],e:'正解は、Cです',img:'<img src="./signquizimage/IMG_1170.jpg">'},
        {n:'4問目',q:'what is d?',a:['A','B','C'],e:'正解は、Aです',img:'<img src="./signquizimage/IMG_0432.jpg">'},
        {n:'5問目',q:'what is e?',a:['B','C','A'],e:'正解は、Bです',img:'<img src="./signquizimage/IMG_0426.jpg">'},
    ];
    
    let currentNum = 0;
    let isAnswered;
    let score = 0;
    let shuffledAnswers;


    function shuffle(arr){
        let i;
        let j;
        let tmp;
        for(i = arr.length-1;i>=0;i--){
            j=Math.floor(Math.random()*(i+1));
            tmp = arr[i];
            arr[i]=arr[j];
            arr[j]=tmp;
        }
        return arr;
    }

    
    function setquiz(){
        var number = document.getElementById('number');
        var questioncontents = document.getElementById('questioncontents');

        number.textContent = quizset[currentNum].n;
        questioncontents.textContent = quizset[currentNum].q;
        quizimage.innerHTML = quizset[currentNum].img;
        shuffledAnswers = shuffle(quizset[currentNum].a.slice());

        isAnswered = false;

        const answers = document.querySelectorAll('#answers > li');

        for(var i = 0; i < answers.length;i++){
            answers[i].classList.remove('correct');
            answers[i].classList.remove('wrong');
            answers[i].textContent = shuffledAnswers[i];
            }
            btn.classList.add('disabled');
            if(currentNum===quizset.length - 1){
                btn.textContent = '正答数を確認する';
            }
        }

    function setEvents(){
        var answers = document.querySelectorAll('#answers > li');
        for(let i=0;i<answers.length;i++){
            answers[i].addEventListener('click',function(){
                checkAnswer(this);
                });
            }
            btn.addEventListener('click',function(){
                if(this.classList.contains('disabled')){
                    return;
                }
        
                if(currentNum===quizset.length){
                    scorelabel.textContent = '正答数: ' + score + ' / ' + quizset.length;
                    result.classList.add('show');
                }else{
                    setquiz();
                }
            });
        }

    function checkAnswer(node){
        if(isAnswered){
            return;
        }

        isAnswered = true;

        if(node.textContent===quizset[currentNum].a[0]){
            node.textContent += '...正解!';
            node.classList.add('correct');
            score++;
        }else{
            node.textContent += '...不正解!　' + quizset[currentNum].e;
            node.classList.add('wrong');
        }
        btn.classList.remove('disabled');
        currentNum++;
    }

        setquiz();
        setEvents();

})();
