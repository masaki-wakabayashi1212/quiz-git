(function(){
    'use strict';

    const questioncontents = document.getElementById('questioncontents');
    const number = document.getElementById('number');
    const quizimage = document.getElementById('quizimage');
    const btn = document.getElementById('btn');
    const answers = document.querySelectorAll('#answers > li');
    const result = document.getElementById('result');
    const scorelabel = document.querySelector('#result > p');
    
    //以下の配列に画像の保存先パスを組み込む？
    const quizset = [
        {n:'1問目',q:'what is a?',a:['A','B','C'],e:'正解は、Aです',},
        {n:'2問目',q:'what is b?',a:['B','A','C'],e:'正解は、Bです',},
        {n:'3問目',q:'what is c?',a:['C','B','A'],e:'正解は、Cです',},
        {n:'4問目',q:'what is d?',a:['A','B','C'],e:'正解は、Aです',},
        {n:'5問目',q:'what is e?',a:['B','C','A'],e:'正解は、Bです',},
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
        
        let i;

        number.textContent = quizset[currentNum].n;
        questioncontents.textContent = quizset[currentNum].q;
        
        
        //以下のif文をリファクタリングしたい。
        //questionimage.innerHTML = '<img src="quizset[currentNum].img">'と記載してみたが、HTML上に画像は表示されず
       if(number.textContent===quizset[0].n){
            quizimage.innerHTML = '<img src="./signquizimage/IMG_1173.jpg">'
            }else if(number.textContent===quizset[1].n){
                quizimage.innerHTML = '<img src="./signquizimage/IMG_0423.jpg">'
            }else if(number.textContent===quizset[2].n){
                quizimage.innerHTML = '<img src="./signquizimage/IMG_1170.jpg">'
            }else if(number.textContent===quizset[3].n){
                quizimage.innerHTML = '<img src="./signquizimage/IMG_0432.jpg">'
            }else if(number.textContent===quizset[4].n){
                quizimage.innerHTML = '<img src="./signquizimage/IMG_0426.jpg">'
            }

        
        
        shuffledAnswers = shuffle(quizset[currentNum].a.slice());

        isAnswered = false;


        for(i=0;i<answers.length;i++){
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
        let i; 
        for(i=0;i<answers.length;i++){
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
