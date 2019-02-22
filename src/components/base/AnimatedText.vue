<template>
  <section class="cd-intro">
    <h1 ref="headline" class="cd-headline" :class="currentMode.animationClasses">
			<span ref="wordsWrapper" class="cd-words-wrapper">
        <!--sentence level animation-->
        <template v-if="currentMode.hasLetter">
          <b class="is-visible" style="opacity: 1">
            <i class="in" v-for="letter in showingText.split('')">{{letter.replace(' ', '&nbsp;')}}</i>
          </b>
          <b class="is-hidden" style="opacity: 1">
            <i class="out" v-for="letter in hidingText.split('')">{{letter.replace(' ', '&nbsp;')}}</i>
          </b>
        </template>
        <!--letter level animation-->
        <template v-if="!currentMode.hasLetter">
          <b class="is-visible">{{showingText.replace(/ /g, '&nbsp;')}}</b>
          <b>{{hidingText.replace(/ /g, '&nbsp;')}}</b>
        </template>
			</span>
    </h1>
  </section>
</template>

<script>
  const ANIMATION_TEXT_TYPE = {
    'CRASH_DOWN': {animationClasses: 'rotate-1'},
    'TYPE_LETTER': {animationClasses: 'letters type', hasLetter: true,},
    'SWITCH_LETTER': {animationClasses: 'letters rotate-2', hasLetter: true,},
    'LOADING_BAR': {animationClasses: 'loading-bar'},
    'SLIDE_DOWN': {animationClasses: 'slide'},
    'CLIP_LETTER': {animationClasses: 'clip is-full-width'},
    'ZOOM_IN': {animationClasses: 'zoom'},
    'ROTATE_LETTER': {animationClasses: 'letters rotate-3', hasLetter: true,},
    'SCALE_LETTER': {animationClasses: 'letters scale', hasLetter: true,},
    'SLIDE_LEFT': {animationClasses: 'push'}
  };

  export default {
    name: "AnimatedText",
    data () {
      return {
        showingText: '感时花溅泪',
        hidingText: '恨别鸟惊心',
        indexShowing: 1
      };
    },
    props: {
      animationType: {
        type: String,
        default: 'CRASH_DOWN'
      },
      animationDelay: {  //set animation timing
        type: Number,
        default: 2500
      },
      lettersDelay: {  //letters effect
        type: Number,
        default: 50
      },
      typeLettersDelay: {  //type effect
        type: Number,
        default: 150
      },
      selectionDuration: {
        type: Number,
        default: 500
      },
      revealDuration: {  //clip effect
        type: Number,
        default: 600
      },
      revealAnimationDelay: {
        type: Number,
        default: 1500
      },
      textArr: {
        type: Array,
        default: () => {
          return [
            '昨夜雨疏风骤',
            '浓睡不消残酒',
            '试问卷帘人  ',
            '却道海棠依旧',
            '知否，知否  ',
            '应是绿肥红瘦'
          ];
        }
      }
    },
    computed: {
      barWaiting () {
        return this.animationDelay - 3000;   //3000 is the duration of the transition on the loading bar - set in the scss/css file
      },
      typeAnimationDelay () {
        return this.selectionDuration + 800;
      },
      currentMode () {
        return ANIMATION_TEXT_TYPE[this.animationType];
      }
    },
    mounted () {
      this.initHeadline();

    },
    methods: {
      initHeadline () {

        if (this.currentMode) {
          //initialise headline animation
          this.showingText = this.textArr[0];
          this.hidingText = this.textArr[1];

          this.animateHeadline();
        } else {

        }

      },
      animateHeadline () {
        let headline = this.$refs.headline,
          headlineClassList = headline.classList;

        if (headlineClassList.contains('loading-bar')) {
          setTimeout(() => {
            this.$refs.wordsWrapper.classList.add('is-loading')
          }, this.barWaiting);

        } else if (headlineClassList.contains('clip')) {
          let spanWrapper = this.$refs.wordsWrapper;
          spanWrapper.style.width = `${ spanWrapper.clientWidth + 10 }px`;

        } else if (!headlineClassList.contains('type')) {
          //TODO assign to .cd-words-wrapper the width of its longest word
          //let words = headline.find('.cd-words-wrapper b'),
          let width = 1000;

          //this.$refs.wordsWrapper.style.width = `${ width}px`;

        }

        //trigger animation
        setTimeout(() => {
          this.hideWord(this.$refs.wordsWrapper.querySelector(".is-visible"))
        }, this.animationDelay);

      },
      hideWord (word) {

        let headline = this.$refs.headline,
          wordsWrapper = this.$refs.wordsWrapper,
          headlineClassList = headline.classList;

        let nextWord = this.takeNext(word);

        if (headlineClassList.contains('type')) {
          wordsWrapper.classList.add('selected');
          wordsWrapper.classList.remove('waiting');

          setTimeout(() => {
            wordsWrapper.classList.remove('selected');
            word.classList.remove('is-visible');
            word.classList.add('is-hidden');
            word.querySelectorAll("i").forEach((iE) => {
              iE.classList.remove('in');
              iE.classList.add('out');
            });
            this.switchText(word);

          }, this.selectionDuration);

          setTimeout(() => {
            this.showWord(nextWord, this.typeLettersDelay)
          }, this.typeAnimationDelay);

        } else if (headlineClassList.contains('letters')) {
          let bool = (word.querySelectorAll('i').length >= nextWord.querySelectorAll('i').length);
          this.hideLetter(word.querySelector('i'), word, bool, this.lettersDelay);
          this.showLetter(nextWord.querySelector('i'), nextWord, bool, this.lettersDelay);

        } else if (headlineClassList.contains('clip')) {
          this.animate(wordsWrapper, { width : 2}, this.revealDuration, () => {

            this.switchWord(word, nextWord);
            this.showWord(nextWord);
            this.switchText(word);

          });

        } else if (headlineClassList.contains('loading-bar')) {
          wordsWrapper.classList.remove('is-loading');
          this.switchWord(word, nextWord);

          setTimeout(() => {
            this.hideWord(nextWord);
            this.switchText(word);
          }, this.animationDelay);

          setTimeout(() => {
            wordsWrapper.classList.add('is-loading')
          }, this.barWaiting);

        } else {
          this.switchWord(word, nextWord);
          setTimeout(() => {

            this.hideWord(nextWord)
            this.switchText(word);

          }, this.animationDelay);

        }
      },
      showWord (word, duration) {

        let headline = this.$refs.headline,
          wordsWrapper = this.$refs.wordsWrapper,
          headlineClassList = headline.classList;

        if (headlineClassList.contains('type')) {
          this.showLetter(word.querySelector('i'), word, false, duration);
          word.classList.add('is-visible');
          word.classList.remove('is-hidden');

        } else if (headlineClassList.contains('clip')) {
          this.animate(wordsWrapper, {'width': word.clientWidth + 10}, this.revealDuration, () => {
            setTimeout(() => {
              this.hideWord(word)
            }, this.revealAnimationDelay);

          });
        }
      },
      showLetter (letter, word, bool, duration) {
        letter.classList.add('in');
        letter.classList.remove('out');

        if (letter.nextElementSibling) {
          setTimeout(() => {
            this.showLetter(letter.nextElementSibling, word, bool, duration);
          }, duration);

        } else {

          if (this.$refs.headline.classList.contains('type')) {
            setTimeout(() => {
              this.$refs.wordsWrapper.classList.add('waiting');
            }, 200);

          }
          if (!bool) {
            setTimeout(() => {
              this.hideWord(word);

            }, this.animationDelay)
          }

        }
      },
      hideLetter (letter, word, bool, duration) {
        letter.classList.remove('in')
        letter.classList.add('out');

        if (letter.nextElementSibling) {
          setTimeout(() => {
            this.hideLetter(letter.nextElementSibling, word, bool, duration);
          }, duration);

        } else if (bool) {
          setTimeout(() => {
            this.hideWord(this.takeNext(word));

          }, this.animationDelay);

        }
        if (!letter.nextElementSibling) {
          this.switchText(word);
        }

        if (!letter.nextElementSibling && document.querySelector('html').classList.contains('no-csstransitions')) {
          let nextWord = this.takeNext(word);
          this.switchWord(word, nextWord);

        }
      },
      takeNext (word) {
        return (word.nextElementSibling ? word.nextElementSibling : word.previousElementSibling);
      },
      switchText(oldWord) {
        this.indexShowing = ( this.indexShowing + 1 >= this.textArr.length ? 0 : this.indexShowing + 1 );

        if(oldWord.nextElementSibling){
          this.showingText = this.textArr[this.indexShowing];
        }else {
          this.hidingText = this.textArr[this.indexShowing];
        }
      },
      switchWord (oldWord, newWord) {
        oldWord.classList.remove('is-visible')
        oldWord.classList.add('is-hidden');
        newWord.classList.remove('is-hidden');
        newWord.classList.add('is-visible');
      },
      animate (obj, json, interval, fn) {
        clearInterval(obj.timer);

        let frameRate = 16, gaps = interval / frameRate ;

        function getStyle (obj, arr) {
          return document.defaultView.getComputedStyle(obj, null)[arr];
        }

        obj.timer = setInterval( () => {

          let flag = true;
          for (let arr in json) {
            let icur = 0;

            if (arr === "opacity") {
              icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
            } else {
              icur = parseInt(getStyle(obj, arr));
            }
            let speed = (json[arr] - icur) / gaps;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (icur !== json[arr]) {
              flag = false;
            }
            if (arr === "opacity") {
              obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
              obj.style.opacity = (icur + speed) / 100;
            } else {
              obj.style[arr] = icur + speed + "px";
            }

          }
          if (flag) {
            clearInterval(obj.timer);
            if (fn) {
              fn();
            }
          }
        }, frameRate);
      }

    }
  }
</script>

<style scoped>
  /* --------------------------------

  Primary style

  -------------------------------- */
  *, *::after, *::before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  html * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font: inherit;
  }

  .cd-title {
    position: relative;
    height: 160px;
    line-height: 230px;
    text-align: center;
  }

  .cd-title h1 {
    font-size: 2.4rem;
    font-weight: 700;
  }

  @media only screen and (min-width: 768px) {
    .cd-title {
      line-height: 250px;
    }
  }

  @media only screen and (min-width: 1170px) {
    .cd-title {
      height: 200px;
      line-height: 300px;
    }

    .cd-title h1 {
      font-size: 3rem;
    }
  }

  .cd-intro {
    width: 90%;
    /*max-width: 768px;*/
    text-align: left;
  }

  .cd-intro {
    margin: 4em auto;
  }

  @media only screen and (min-width: 768px) {
    .cd-intro {
      margin: 5em auto;
    }
  }

  @media only screen and (min-width: 1170px) {
    .cd-intro {
      margin: .5em auto;
    }
  }

  .cd-headline {
    font-size: 3rem;
    line-height: 1.2;
  }

  @media only screen and (min-width: 768px) {
    .cd-headline {
      font-size: 4.4rem;
      font-weight: 300;
    }
  }

  @media only screen and (min-width: 1170px) {
    .cd-headline {
      font-size: 1rem;
    }
  }

  .cd-words-wrapper {
    position: relative;
    text-align: left;
  }

  .cd-words-wrapper b {
    display: inline-block;
    position: absolute;
    white-space: nowrap;
    left: 0;
    top: 0;
  }

  .cd-words-wrapper b.is-visible {
    position: relative;
  }

  .no-js .cd-words-wrapper b {
    opacity: 0;
  }

  .no-js .cd-words-wrapper b.is-visible {
    opacity: 1;
  }

  /* --------------------------------

  xrotate-1

  -------------------------------- */
  .cd-headline.rotate-1 .cd-words-wrapper {
    -webkit-perspective: 300px;
    -moz-perspective: 300px;
    perspective: 300px;
  }

  .cd-headline.rotate-1 b {
    opacity: 0;
    -webkit-transform-origin: 50% 100%;
    -moz-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    -o-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    -webkit-transform: rotateX(180deg);
    -moz-transform: rotateX(180deg);
    -ms-transform: rotateX(180deg);
    -o-transform: rotateX(180deg);
    transform: rotateX(180deg);
  }

  .cd-headline.rotate-1 b.is-visible {
    opacity: 1;
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -ms-transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-animation: cd-rotate-1-in 1.2s;
    -moz-animation: cd-rotate-1-in 1.2s;
    animation: cd-rotate-1-in 1.2s;
  }

  .cd-headline.rotate-1 b.is-hidden {
    -webkit-transform: rotateX(180deg);
    -moz-transform: rotateX(180deg);
    -ms-transform: rotateX(180deg);
    -o-transform: rotateX(180deg);
    transform: rotateX(180deg);
    -webkit-animation: cd-rotate-1-out 1.2s;
    -moz-animation: cd-rotate-1-out 1.2s;
    animation: cd-rotate-1-out 1.2s;
  }

  @-webkit-keyframes cd-rotate-1-in {
    0% {
      -webkit-transform: rotateX(180deg);
      opacity: 0;
    }
    35% {
      -webkit-transform: rotateX(120deg);
      opacity: 0;
    }
    65% {
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(360deg);
      opacity: 1;
    }
  }

  @-moz-keyframes cd-rotate-1-in {
    0% {
      -moz-transform: rotateX(180deg);
      opacity: 0;
    }
    35% {
      -moz-transform: rotateX(120deg);
      opacity: 0;
    }
    65% {
      opacity: 0;
    }
    100% {
      -moz-transform: rotateX(360deg);
      opacity: 1;
    }
  }

  @keyframes cd-rotate-1-in {
    0% {
      -webkit-transform: rotateX(180deg);
      -moz-transform: rotateX(180deg);
      -ms-transform: rotateX(180deg);
      -o-transform: rotateX(180deg);
      transform: rotateX(180deg);
      opacity: 0;
    }
    35% {
      -webkit-transform: rotateX(120deg);
      -moz-transform: rotateX(120deg);
      -ms-transform: rotateX(120deg);
      -o-transform: rotateX(120deg);
      transform: rotateX(120deg);
      opacity: 0;
    }
    65% {
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(360deg);
      -moz-transform: rotateX(360deg);
      -ms-transform: rotateX(360deg);
      -o-transform: rotateX(360deg);
      transform: rotateX(360deg);
      opacity: 1;
    }
  }

  @-webkit-keyframes cd-rotate-1-out {
    0% {
      -webkit-transform: rotateX(0deg);
      opacity: 1;
    }
    35% {
      -webkit-transform: rotateX(-40deg);
      opacity: 1;
    }
    65% {
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(180deg);
      opacity: 0;
    }
  }

  @-moz-keyframes cd-rotate-1-out {
    0% {
      -moz-transform: rotateX(0deg);
      opacity: 1;
    }
    35% {
      -moz-transform: rotateX(-40deg);
      opacity: 1;
    }
    65% {
      opacity: 0;
    }
    100% {
      -moz-transform: rotateX(180deg);
      opacity: 0;
    }
  }

  @keyframes cd-rotate-1-out {
    0% {
      -webkit-transform: rotateX(0deg);
      -moz-transform: rotateX(0deg);
      -ms-transform: rotateX(0deg);
      -o-transform: rotateX(0deg);
      transform: rotateX(0deg);
      opacity: 1;
    }
    35% {
      -webkit-transform: rotateX(-40deg);
      -moz-transform: rotateX(-40deg);
      -ms-transform: rotateX(-40deg);
      -o-transform: rotateX(-40deg);
      transform: rotateX(-40deg);
      opacity: 1;
    }
    65% {
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(180deg);
      -moz-transform: rotateX(180deg);
      -ms-transform: rotateX(180deg);
      -o-transform: rotateX(180deg);
      transform: rotateX(180deg);
      opacity: 0;
    }
  }

  /* --------------------------------

  xtype

  -------------------------------- */
  .cd-headline.type .cd-words-wrapper {
    vertical-align: top;
    overflow: hidden;
  }

  .cd-headline.type .cd-words-wrapper::after {
    /* vertical bar */
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    bottom: auto;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    height: 90%;
    width: 1px;
    background-color: #aebcb9;
  }

  .cd-headline.type .cd-words-wrapper.waiting::after {
    -webkit-animation: cd-pulse 1s infinite;
    -moz-animation: cd-pulse 1s infinite;
    animation: cd-pulse 1s infinite;
  }

  .cd-headline.type .cd-words-wrapper.selected {
    background-color: #aebcb9;
  }

  .cd-headline.type .cd-words-wrapper.selected::after {
    visibility: hidden;
  }

  .cd-headline.type .cd-words-wrapper.selected b {
    color: #0d0d0d;
  }

  .cd-headline.type b {
    visibility: hidden;
  }

  .cd-headline.type b.is-visible {
    visibility: visible;
  }

  .cd-headline.type i {
    position: absolute;
    visibility: hidden;
  }

  .cd-headline.type i.in {
    position: relative;
    visibility: visible;
  }

  @-webkit-keyframes cd-pulse {
    0% {
      -webkit-transform: translateY(-50%) scale(1);
      opacity: 1;
    }
    40% {
      -webkit-transform: translateY(-50%) scale(0.9);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(-50%) scale(0);
      opacity: 0;
    }
  }

  @-moz-keyframes cd-pulse {
    0% {
      -moz-transform: translateY(-50%) scale(1);
      opacity: 1;
    }
    40% {
      -moz-transform: translateY(-50%) scale(0.9);
      opacity: 0;
    }
    100% {
      -moz-transform: translateY(-50%) scale(0);
      opacity: 0;
    }
  }

  @keyframes cd-pulse {
    0% {
      -webkit-transform: translateY(-50%) scale(1);
      -moz-transform: translateY(-50%) scale(1);
      -ms-transform: translateY(-50%) scale(1);
      -o-transform: translateY(-50%) scale(1);
      transform: translateY(-50%) scale(1);
      opacity: 1;
    }
    40% {
      -webkit-transform: translateY(-50%) scale(0.9);
      -moz-transform: translateY(-50%) scale(0.9);
      -ms-transform: translateY(-50%) scale(0.9);
      -o-transform: translateY(-50%) scale(0.9);
      transform: translateY(-50%) scale(0.9);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(-50%) scale(0);
      -moz-transform: translateY(-50%) scale(0);
      -ms-transform: translateY(-50%) scale(0);
      -o-transform: translateY(-50%) scale(0);
      transform: translateY(-50%) scale(0);
      opacity: 0;
    }
  }

  /* --------------------------------

  xrotate-2

  -------------------------------- */
  .cd-headline.rotate-2 .cd-words-wrapper {
    -webkit-perspective: 300px;
    -moz-perspective: 300px;
    perspective: 300px;
  }

  .cd-headline.rotate-2 i, .cd-headline.rotate-2 em {
    display: inline-block;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .cd-headline.rotate-2 b {
    opacity: 0;
  }

  .cd-headline.rotate-2 i {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateZ(-20px) rotateX(90deg);
    -moz-transform: translateZ(-20px) rotateX(90deg);
    -ms-transform: translateZ(-20px) rotateX(90deg);
    -o-transform: translateZ(-20px) rotateX(90deg);
    transform: translateZ(-20px) rotateX(90deg);
    opacity: 0;
  }

  .is-visible .cd-headline.rotate-2 i {
    opacity: 1;
  }

  .cd-headline.rotate-2 i.in {
    -webkit-animation: cd-rotate-2-in 0.4s forwards;
    -moz-animation: cd-rotate-2-in 0.4s forwards;
    animation: cd-rotate-2-in 0.4s forwards;
  }

  .cd-headline.rotate-2 i.out {
    -webkit-animation: cd-rotate-2-out 0.4s forwards;
    -moz-animation: cd-rotate-2-out 0.4s forwards;
    animation: cd-rotate-2-out 0.4s forwards;
  }

  .cd-headline.rotate-2 em {
    -webkit-transform: translateZ(20px);
    -moz-transform: translateZ(20px);
    -ms-transform: translateZ(20px);
    -o-transform: translateZ(20px);
    transform: translateZ(20px);
  }

  .no-csstransitions .cd-headline.rotate-2 i {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -ms-transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    transform: rotateX(0deg);
    opacity: 0;
  }

  .no-csstransitions .cd-headline.rotate-2 i em {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  .no-csstransitions .cd-headline.rotate-2 .is-visible i {
    opacity: 1;
  }

  @-webkit-keyframes cd-rotate-2-in {
    0% {
      opacity: 0;
      -webkit-transform: translateZ(-20px) rotateX(90deg);
    }
    60% {
      opacity: 1;
      -webkit-transform: translateZ(-20px) rotateX(-10deg);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateZ(-20px) rotateX(0deg);
    }
  }

  @-moz-keyframes cd-rotate-2-in {
    0% {
      opacity: 0;
      -moz-transform: translateZ(-20px) rotateX(90deg);
    }
    60% {
      opacity: 1;
      -moz-transform: translateZ(-20px) rotateX(-10deg);
    }
    100% {
      opacity: 1;
      -moz-transform: translateZ(-20px) rotateX(0deg);
    }
  }

  @keyframes cd-rotate-2-in {
    0% {
      opacity: 0;
      -webkit-transform: translateZ(-20px) rotateX(90deg);
      -moz-transform: translateZ(-20px) rotateX(90deg);
      -ms-transform: translateZ(-20px) rotateX(90deg);
      -o-transform: translateZ(-20px) rotateX(90deg);
      transform: translateZ(-20px) rotateX(90deg);
    }
    60% {
      opacity: 1;
      -webkit-transform: translateZ(-20px) rotateX(-10deg);
      -moz-transform: translateZ(-20px) rotateX(-10deg);
      -ms-transform: translateZ(-20px) rotateX(-10deg);
      -o-transform: translateZ(-20px) rotateX(-10deg);
      transform: translateZ(-20px) rotateX(-10deg);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateZ(-20px) rotateX(0deg);
      -moz-transform: translateZ(-20px) rotateX(0deg);
      -ms-transform: translateZ(-20px) rotateX(0deg);
      -o-transform: translateZ(-20px) rotateX(0deg);
      transform: translateZ(-20px) rotateX(0deg);
    }
  }

  @-webkit-keyframes cd-rotate-2-out {
    0% {
      opacity: 1;
      -webkit-transform: translateZ(-20px) rotateX(0);
    }
    60% {
      opacity: 0;
      -webkit-transform: translateZ(-20px) rotateX(-100deg);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateZ(-20px) rotateX(-90deg);
    }
  }

  @-moz-keyframes cd-rotate-2-out {
    0% {
      opacity: 1;
      -moz-transform: translateZ(-20px) rotateX(0);
    }
    60% {
      opacity: 0;
      -moz-transform: translateZ(-20px) rotateX(-100deg);
    }
    100% {
      opacity: 0;
      -moz-transform: translateZ(-20px) rotateX(-90deg);
    }
  }

  @keyframes cd-rotate-2-out {
    0% {
      opacity: 1;
      -webkit-transform: translateZ(-20px) rotateX(0);
      -moz-transform: translateZ(-20px) rotateX(0);
      -ms-transform: translateZ(-20px) rotateX(0);
      -o-transform: translateZ(-20px) rotateX(0);
      transform: translateZ(-20px) rotateX(0);
    }
    60% {
      opacity: 0;
      -webkit-transform: translateZ(-20px) rotateX(-100deg);
      -moz-transform: translateZ(-20px) rotateX(-100deg);
      -ms-transform: translateZ(-20px) rotateX(-100deg);
      -o-transform: translateZ(-20px) rotateX(-100deg);
      transform: translateZ(-20px) rotateX(-100deg);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateZ(-20px) rotateX(-90deg);
      -moz-transform: translateZ(-20px) rotateX(-90deg);
      -ms-transform: translateZ(-20px) rotateX(-90deg);
      -o-transform: translateZ(-20px) rotateX(-90deg);
      transform: translateZ(-20px) rotateX(-90deg);
    }
  }

  /* --------------------------------

  xloading-bar

  -------------------------------- */
  .cd-headline.loading-bar span {
    display: inline-block;
    padding: .2em 0;
  }

  .cd-headline.loading-bar .cd-words-wrapper {
    overflow: hidden;
    vertical-align: top;
  }

  .cd-headline.loading-bar .cd-words-wrapper::after {
    /* loading bar */
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 0;
    background: #0096a7;
    z-index: 2;
    -webkit-transition: width 0.3s -0.1s;
    -moz-transition: width 0.3s -0.1s;
    transition: width 0.3s -0.1s;
  }

  .cd-headline.loading-bar .cd-words-wrapper.is-loading::after {
    width: 100%;
    -webkit-transition: width 3s;
    -moz-transition: width 3s;
    transition: width 3s;
  }

  .cd-headline.loading-bar b {
    top: .2em;
    opacity: 0;
    -webkit-transition: opacity 0.3s;
    -moz-transition: opacity 0.3s;
    transition: opacity 0.3s;
  }

  .cd-headline.loading-bar b.is-visible {
    opacity: 1;
    top: 0;
  }

  /* --------------------------------

  xslide

  -------------------------------- */
  .cd-headline.slide span {
    padding: .2em 0;
  }

  .cd-headline.slide .cd-words-wrapper {
    overflow: hidden;
    vertical-align: top;
  }

  .cd-headline.slide b {
    opacity: 0;
    top: .2em;
  }

  .cd-headline.slide b.is-visible {
    top: 0;
    opacity: 1;
    -webkit-animation: slide-in 0.6s;
    -moz-animation: slide-in 0.6s;
    animation: slide-in 0.6s;
  }

  .cd-headline.slide b.is-hidden {
    -webkit-animation: slide-out 0.6s;
    -moz-animation: slide-out 0.6s;
    animation: slide-out 0.6s;
  }

  @-webkit-keyframes slide-in {
    0% {
      opacity: 0;
      -webkit-transform: translateY(-100%);
    }
    60% {
      opacity: 1;
      -webkit-transform: translateY(20%);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
  }

  @-moz-keyframes slide-in {
    0% {
      opacity: 0;
      -moz-transform: translateY(-100%);
    }
    60% {
      opacity: 1;
      -moz-transform: translateY(20%);
    }
    100% {
      opacity: 1;
      -moz-transform: translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
      -webkit-transform: translateY(-100%);
      -moz-transform: translateY(-100%);
      -ms-transform: translateY(-100%);
      -o-transform: translateY(-100%);
      transform: translateY(-100%);
    }
    60% {
      opacity: 1;
      -webkit-transform: translateY(20%);
      -moz-transform: translateY(20%);
      -ms-transform: translateY(20%);
      -o-transform: translateY(20%);
      transform: translateY(20%);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
  }

  @-webkit-keyframes slide-out {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
    60% {
      opacity: 0;
      -webkit-transform: translateY(120%);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(100%);
    }
  }

  @-moz-keyframes slide-out {
    0% {
      opacity: 1;
      -moz-transform: translateY(0);
    }
    60% {
      opacity: 0;
      -moz-transform: translateY(120%);
    }
    100% {
      opacity: 0;
      -moz-transform: translateY(100%);
    }
  }

  @keyframes slide-out {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
    60% {
      opacity: 0;
      -webkit-transform: translateY(120%);
      -moz-transform: translateY(120%);
      -ms-transform: translateY(120%);
      -o-transform: translateY(120%);
      transform: translateY(120%);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(100%);
      -moz-transform: translateY(100%);
      -ms-transform: translateY(100%);
      -o-transform: translateY(100%);
      transform: translateY(100%);
    }
  }

  /* --------------------------------

  xclip

  -------------------------------- */
  .cd-headline.clip span {
    display: inline-block;
    padding: .2em 0;
  }

  .cd-headline.clip .cd-words-wrapper {
    overflow: hidden;
    vertical-align: top;
  }

  .cd-headline.clip .cd-words-wrapper::after {
    /* line */
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background-color: #aebcb9;
  }

  .cd-headline.clip b {
    opacity: 0;
  }

  .cd-headline.clip b.is-visible {
    opacity: 1;
  }

  /* --------------------------------

  xzoom

  -------------------------------- */
  .cd-headline.zoom .cd-words-wrapper {
    -webkit-perspective: 300px;
    -moz-perspective: 300px;
    perspective: 300px;
  }

  .cd-headline.zoom b {
    opacity: 0;
  }

  .cd-headline.zoom b.is-visible {
    opacity: 1;
    -webkit-animation: zoom-in 0.8s;
    -moz-animation: zoom-in 0.8s;
    animation: zoom-in 0.8s;
  }

  .cd-headline.zoom b.is-hidden {
    -webkit-animation: zoom-out 0.8s;
    -moz-animation: zoom-out 0.8s;
    animation: zoom-out 0.8s;
  }

  @-webkit-keyframes zoom-in {
    0% {
      opacity: 0;
      -webkit-transform: translateZ(100px);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateZ(0);
    }
  }

  @-moz-keyframes zoom-in {
    0% {
      opacity: 0;
      -moz-transform: translateZ(100px);
    }
    100% {
      opacity: 1;
      -moz-transform: translateZ(0);
    }
  }

  @keyframes zoom-in {
    0% {
      opacity: 0;
      -webkit-transform: translateZ(100px);
      -moz-transform: translateZ(100px);
      -ms-transform: translateZ(100px);
      -o-transform: translateZ(100px);
      transform: translateZ(100px);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateZ(0);
      -moz-transform: translateZ(0);
      -ms-transform: translateZ(0);
      -o-transform: translateZ(0);
      transform: translateZ(0);
    }
  }

  @-webkit-keyframes zoom-out {
    0% {
      opacity: 1;
      -webkit-transform: translateZ(0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateZ(-100px);
    }
  }

  @-moz-keyframes zoom-out {
    0% {
      opacity: 1;
      -moz-transform: translateZ(0);
    }
    100% {
      opacity: 0;
      -moz-transform: translateZ(-100px);
    }
  }

  @keyframes zoom-out {
    0% {
      opacity: 1;
      -webkit-transform: translateZ(0);
      -moz-transform: translateZ(0);
      -ms-transform: translateZ(0);
      -o-transform: translateZ(0);
      transform: translateZ(0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateZ(-100px);
      -moz-transform: translateZ(-100px);
      -ms-transform: translateZ(-100px);
      -o-transform: translateZ(-100px);
      transform: translateZ(-100px);
    }
  }

  /* --------------------------------

  xrotate-3

  -------------------------------- */
  .cd-headline.rotate-3 .cd-words-wrapper {
    -webkit-perspective: 300px;
    -moz-perspective: 300px;
    perspective: 300px;
  }

  .cd-headline.rotate-3 b {
    opacity: 0;
  }

  .cd-headline.rotate-3 i {
    display: inline-block;
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .is-visible .cd-headline.rotate-3 i {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }

  .cd-headline.rotate-3 i.in {
    -webkit-animation: cd-rotate-3-in 0.6s forwards;
    -moz-animation: cd-rotate-3-in 0.6s forwards;
    animation: cd-rotate-3-in 0.6s forwards;
  }

  .cd-headline.rotate-3 i.out {
    -webkit-animation: cd-rotate-3-out 0.6s forwards;
    -moz-animation: cd-rotate-3-out 0.6s forwards;
    animation: cd-rotate-3-out 0.6s forwards;
  }

  .no-csstransitions .cd-headline.rotate-3 i {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    transform: rotateY(0deg);
    opacity: 0;
  }

  .no-csstransitions .cd-headline.rotate-3 .is-visible i {
    opacity: 1;
  }

  @-webkit-keyframes cd-rotate-3-in {
    0% {
      -webkit-transform: rotateY(180deg);
    }
    100% {
      -webkit-transform: rotateY(0deg);
    }
  }

  @-moz-keyframes cd-rotate-3-in {
    0% {
      -moz-transform: rotateY(180deg);
    }
    100% {
      -moz-transform: rotateY(0deg);
    }
  }

  @keyframes cd-rotate-3-in {
    0% {
      -webkit-transform: rotateY(180deg);
      -moz-transform: rotateY(180deg);
      -ms-transform: rotateY(180deg);
      -o-transform: rotateY(180deg);
      transform: rotateY(180deg);
    }
    100% {
      -webkit-transform: rotateY(0deg);
      -moz-transform: rotateY(0deg);
      -ms-transform: rotateY(0deg);
      -o-transform: rotateY(0deg);
      transform: rotateY(0deg);
    }
  }

  @-webkit-keyframes cd-rotate-3-out {
    0% {
      -webkit-transform: rotateY(0);
    }
    100% {
      -webkit-transform: rotateY(-180deg);
    }
  }

  @-moz-keyframes cd-rotate-3-out {
    0% {
      -moz-transform: rotateY(0);
    }
    100% {
      -moz-transform: rotateY(-180deg);
    }
  }

  @keyframes cd-rotate-3-out {
    0% {
      -webkit-transform: rotateY(0);
      -moz-transform: rotateY(0);
      -ms-transform: rotateY(0);
      -o-transform: rotateY(0);
      transform: rotateY(0);
    }
    100% {
      -webkit-transform: rotateY(-180deg);
      -moz-transform: rotateY(-180deg);
      -ms-transform: rotateY(-180deg);
      -o-transform: rotateY(-180deg);
      transform: rotateY(-180deg);
    }
  }

  /* --------------------------------

  xscale

  -------------------------------- */
  .cd-headline.scale b {
    opacity: 0;
  }

  .cd-headline.scale i {
    display: inline-block;
    opacity: 0;
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
  }

  .is-visible .cd-headline.scale i {
    opacity: 1;
  }

  .cd-headline.scale i.in {
    -webkit-animation: scale-up 0.6s forwards;
    -moz-animation: scale-up 0.6s forwards;
    animation: scale-up 0.6s forwards;
  }

  .cd-headline.scale i.out {
    -webkit-animation: scale-down 0.6s forwards;
    -moz-animation: scale-down 0.6s forwards;
    animation: scale-down 0.6s forwards;
  }

  .no-csstransitions .cd-headline.scale i {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }

  .no-csstransitions .cd-headline.scale .is-visible i {
    opacity: 1;
  }

  @-webkit-keyframes scale-up {
    0% {
      -webkit-transform: scale(0);
      opacity: 0;
    }
    60% {
      -webkit-transform: scale(1.2);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 1;
    }
  }

  @-moz-keyframes scale-up {
    0% {
      -moz-transform: scale(0);
      opacity: 0;
    }
    60% {
      -moz-transform: scale(1.2);
      opacity: 1;
    }
    100% {
      -moz-transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes scale-up {
    0% {
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
      -ms-transform: scale(0);
      -o-transform: scale(0);
      transform: scale(0);
      opacity: 0;
    }
    60% {
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
      -ms-transform: scale(1.2);
      -o-transform: scale(1.2);
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  @-webkit-keyframes scale-down {
    0% {
      -webkit-transform: scale(1);
      opacity: 1;
    }
    60% {
      -webkit-transform: scale(0);
      opacity: 0;
    }
  }

  @-moz-keyframes scale-down {
    0% {
      -moz-transform: scale(1);
      opacity: 1;
    }
    60% {
      -moz-transform: scale(0);
      opacity: 0;
    }
  }

  @keyframes scale-down {
    0% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
    60% {
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
      -ms-transform: scale(0);
      -o-transform: scale(0);
      transform: scale(0);
      opacity: 0;
    }
  }

  /* --------------------------------

  xpush

  -------------------------------- */
  .cd-headline.push b {
    opacity: 0;
  }

  .cd-headline.push b.is-visible {
    opacity: 1;
    -webkit-animation: push-in 0.6s;
    -moz-animation: push-in 0.6s;
    animation: push-in 0.6s;
  }

  .cd-headline.push b.is-hidden {
    -webkit-animation: push-out 0.6s;
    -moz-animation: push-out 0.6s;
    animation: push-out 0.6s;
  }

  @-webkit-keyframes push-in {
    0% {
      opacity: 0;
      -webkit-transform: translateX(-100%);
    }
    60% {
      opacity: 1;
      -webkit-transform: translateX(10%);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateX(0);
    }
  }

  @-moz-keyframes push-in {
    0% {
      opacity: 0;
      -moz-transform: translateX(-100%);
    }
    60% {
      opacity: 1;
      -moz-transform: translateX(10%);
    }
    100% {
      opacity: 1;
      -moz-transform: translateX(0);
    }
  }

  @keyframes push-in {
    0% {
      opacity: 0;
      -webkit-transform: translateX(-100%);
      -moz-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      -o-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    60% {
      opacity: 1;
      -webkit-transform: translateX(10%);
      -moz-transform: translateX(10%);
      -ms-transform: translateX(10%);
      -o-transform: translateX(10%);
      transform: translateX(10%);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      -ms-transform: translateX(0);
      -o-transform: translateX(0);
      transform: translateX(0);
    }
  }

  @-webkit-keyframes push-out {
    0% {
      opacity: 1;
      -webkit-transform: translateX(0);
    }
    60% {
      opacity: 0;
      -webkit-transform: translateX(110%);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateX(100%);
    }
  }

  @-moz-keyframes push-out {
    0% {
      opacity: 1;
      -moz-transform: translateX(0);
    }
    60% {
      opacity: 0;
      -moz-transform: translateX(110%);
    }
    100% {
      opacity: 0;
      -moz-transform: translateX(100%);
    }
  }

  @keyframes push-out {
    0% {
      opacity: 1;
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      -ms-transform: translateX(0);
      -o-transform: translateX(0);
      transform: translateX(0);
    }
    60% {
      opacity: 0;
      -webkit-transform: translateX(110%);
      -moz-transform: translateX(110%);
      -ms-transform: translateX(110%);
      -o-transform: translateX(110%);
      transform: translateX(110%);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateX(100%);
      -moz-transform: translateX(100%);
      -ms-transform: translateX(100%);
      -o-transform: translateX(100%);
      transform: translateX(100%);
    }
  }

</style>
