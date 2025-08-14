export const timeController = (duration, onTimeUp, onTick) => {
  let timeLeft = duration;
  let timerId = null;

  const start = () => {
    stop();
    timeLeft = duration;
    timerId = setInterval(() => {
      timeLeft--;
      if (onTick) onTick(timeLeft);
      if (timeLeft <= 0) {
        stop();
        onTimeUp();
      }
    }, 1000);
  };

  const stop = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  return { start, stop };
};
