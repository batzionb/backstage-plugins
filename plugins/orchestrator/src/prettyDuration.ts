const getPrettyDuration = (milliseconds: number): string => {
  let sec = Math.round(milliseconds / 1000);
  let min = 0;
  let hr = 0;
  if (sec >= 60) {
    min = Math.floor(sec / 60);
    sec %= 60;
  }
  if (min >= 60) {
    hr = Math.floor(min / 60);
    min %= 60;
  }
  if (hr > 0) {
    return `${hr} h`;
  }
  if (min > 0) {
    return `${min} min`;
  }
  if (sec > 0) {
    return `${sec} sec`;
  }
  return 'less than a sec';
};

export default getPrettyDuration;
