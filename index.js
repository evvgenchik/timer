const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// const startTimer = (cb) => {
//   setInterval(() => cb, 1000);
// };

const formatTime = (time) => {
  const roundedTime = Math.floor(time);
  return roundedTime > 9 ? roundedTime : `0${roundedTime}`;
};

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    let now = new Date().getTime();
    const finishDate = now + seconds * 1000;

    // setTimeout(function timer(){},1000)

    setInterval(() => {
      const distance = (finishDate - now) / 1000;

      const hh = formatTime(distance / (60 * 60));
      const mm = formatTime((distance % (60 * 60)) / 60);
      const ss = formatTime(distance % 60);
      timerEl.textContent = `${hh}-${mm}-${ss}`;
      now = new Date().getTime();
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  const numberRegex = new RegExp(/\D/g);
  const inputValue = e.target.value;
  const inputValueNumbers = inputValue.replace(numberRegex, '');
  inputEl.value = inputValueNumbers;
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
