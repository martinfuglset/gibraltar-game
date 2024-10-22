export const calculateTimeLeft = (startTime) => {
  const difference = +new Date(startTime.toDate()) + (0.5 * 60 * 1000) + 1000 - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = {
      minutes: 0,
      seconds: 0,
    };
  }

  return timeLeft;
};
