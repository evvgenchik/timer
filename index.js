const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let timerId;

const stopTimer = (id) => clearInterval(id);

const formatTime = (time) => {
  const roundedTime = Math.floor(time);
  return roundedTime > 9 ? roundedTime : `0${roundedTime}`;
};

const createTimerAnimator = () => {
  return (seconds) => {
    const now = new Date().getTime();
    const finishDate = now + seconds * 1000;
    let distance = (finishDate - now) / 1000;

    timerId = setInterval(() => {
      if (distance < 1) clearInterval(timerId);

      const hh = formatTime(distance / (60 * 60));
      const mm = formatTime((distance % (60 * 60)) / 60);
      const ss = formatTime(distance % 60);

      timerEl.textContent = `${hh}-${mm}-${ss}`;
      distance--;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  const numberPattern = /\D/g;
  const inputValue = e.target.value;
  const inputValueNumbers = inputValue.replace(numberPattern, '');
  inputEl.value = inputValueNumbers;
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  stopTimer(timerId);
  animateTimer(seconds);

  inputEl.value = '';
});
