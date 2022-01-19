window.addEventListener('DOMContentLoaded', function () {
   const holes = document.querySelectorAll('.hole');
   const scoreBoard = document.querySelector('.score');
   const moles = document.querySelectorAll('.mole');
   let lasthole;
   let lastTime = false;
   let score = localStorage.getItem('score') || 0;
   scoreBoard.textContent = score;

   const btnStart = document.querySelector('.btnStart')
   const btnStop = document.querySelector('.btnStop')
   const btlLevel2 = document.querySelector('.btlLevel2')
   const btlLevel3 = document.querySelector('.btlLevel3')
   
   let divhole7 = document.createElement('div');
   let divhole8 = document.createElement('div');
   let divhole9 = document.createElement('div');


   function randTime (min, max) {
      return Math.round(Math.random() * (max - min) + min);
   } 

   function randomHole (holes) {
      const idx = Math.floor(Math.random() * holes.length);
      const hole = holes[idx];
      if (hole === lasthole) {
         console.log('ABRA KATABRA'); 
         return randomHole(holes);
      }
      lasthole = hole;
      return hole;
   }


   function hiddenBtnLvl23() {
      btlLevel2.style.visibility = 'hidden'
      btlLevel3.style.visibility = 'hidden'
   }
   
   function openBtnLvl23() {
      btlLevel2.style.visibility = 'visible'
      btlLevel3.style.visibility = 'visible'
   }

   function hiddenBtnStartLvl3() {
      btnStart.style.visibility = 'hidden'
      btlLevel3.style.visibility = 'hidden'
   }
   
   function openBtnStartLvl3() {
      btnStart.style.visibility = 'visible'
      btlLevel3.style.visibility = 'visible'
   }

   function hiddenBtnStartLvl2() {
      btlLevel2.style.visibility = 'hidden'
      btnStart.style.visibility = 'hidden'
   }
   
   function openBtnStartLvl2() {
      btlLevel2.style.visibility = 'visible'
      btnStart.style.visibility = 'visible'
   }

   function peep () {
      const time = randTime (200, 1000);
      const hole = randomHole (holes);
      hole.classList.add('up');
      setTimeout (() => {
         hole.classList.remove('up');
         if (!lastTime) peep();
      }, time)
   }

   function startGame () {
      // scoreBoard.textContent = 10;
      lastTime = false;
      btnStart.disabled = !lastTime;
      btlLevel2.disabled = !lastTime;
      btlLevel3.disabled = !lastTime;      
     
      peep()
      hiddenBtnLvl23()
      setTimeout(() => {
         lastTime = true;  
         openBtnLvl23()
      if (lastTime) {btnStart.disabled = !lastTime,
         btlLevel2.disabled = !lastTime,
         btlLevel3.disabled = !lastTime}}, 10000)
      // setTimeout(() => startLevel2(), 14000)
      // setTimeout(() => startLevel3(), 28000)
   }

   function stopGame () {
      lastTime = true;
      btnStart.disabled = false;
      btlLevel2.disabled = false;
      btlLevel3.disabled = false;
      openBtnLvl23()
      openBtnStartLvl3()
      score = 0;
      scoreBoard.textContent = 0;
      divhole7.remove()
      divhole8.remove()
      divhole9.remove()
      localStorage.setItem('score', 0)
   }

   function bonk (e) {
      if (!e.isTrusted) return;
      score++
      this.parentNode.classList.remove('up');
      scoreBoard.textContent = score;
      localStorage.setItem('score', scoreBoard.textContent)

   }

   moles.forEach(mole => mole.addEventListener('click', bonk));

   function peepLevel2 () {
      const time = randTime (150, 500);
      const hole = randomHole (holes);
      hole.classList.add('up');
      btnStart.disabled = !lastTime;
      btlLevel2.disabled = !lastTime;
      btlLevel3.disabled = !lastTime;
      setTimeout (() => {
         hole.classList.remove('up');
         if (!lastTime) peep();
      }, time)
   }

   function startLevel2 () {
      console.log('start level 2')
      // scoreBoard.textContent = 0;
      lastTime = false;
      // btlLevel2.disabled = !lastTime;
      peepLevel2()
      hiddenBtnStartLvl3()
      setTimeout(() => {
         lastTime = true;
         openBtnStartLvl3()
      if (lastTime) {btnStart.disabled = !lastTime,
         btlLevel2.disabled = !lastTime,
         btlLevel3.disabled = !lastTime}}, 10000)
   }

   function peepLevel3 () {
      const time = randTime (150, 500);
      const hole = randomHole (holes);
      hole.classList.add('up');
      btnStart.disabled = !lastTime;
      btlLevel2.disabled = !lastTime;
      btlLevel3.disabled = !lastTime;
      setTimeout (() => {
         hole.classList.remove('up');
         if (!lastTime) peep();
      }, time)
   }
   
   function startLevel3 () {
      console.log('start level 3')
      divhole7.className = 'hole hole7';
   divhole7.innerHTML = '<div class="mole"></div>';
   gamer.append(divhole7);
   divhole8.className = 'hole hole8';
   divhole8.innerHTML = '<div class="mole"></div>';
   gamer.append(divhole8);
   divhole9.className = 'hole hole9';
   divhole9.innerHTML = '<div class="mole"></div>';
   gamer.append(divhole9);
      // scoreBoard.textContent = 0;
      lastTime = false;
      peepLevel3()
      hiddenBtnStartLvl2()
      setTimeout(() => {
         lastTime = true;
         openBtnStartLvl2()
      if (lastTime) {btnStart.disabled = !lastTime,
         btlLevel2.disabled = !lastTime,
         btlLevel3.disabled = !lastTime}}, 10000)
   }

   btnStart.addEventListener('click', startGame);
   btnStop.addEventListener('click', stopGame);
   btlLevel2.addEventListener('click', startLevel2);
   btlLevel3.addEventListener('click', startLevel3);

})

      