export const TimeController = (duration, onTimeUp, onTick) => {
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

  const pause = () => {
    if (timerId) clearInterval(timerId);
    timerId = null;
  };

  const resume = () => {
    if (!timerId) {
      timerId = setInterval(() => {
        timeLeft--;
        onTick(timeLeft);
        if (timeLeft <= 0) {
          stop();
          onTimeUp();
        }
      }, 1000);
    }
  };

  const stop = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  return { start, pause, resume, stop };
};
