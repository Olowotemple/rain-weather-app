export const sortAlphabetically = (a, b) => {
  a = a[0].toLowerCase();
  b = b[0].toLowerCase();
  return a > b ? 1 : a < b ? -1 : 0;
};

export const formatUtcOffset = (utc) => {
  if (utc === '0' || utc === '-0' || utc === '0.0' || utc === '-0.0') {
    return '+0';
  }
  let utcNum = +utc;
  const sign = utcNum > 0 ? '+' : '-';
  utcNum = Math.abs(utcNum);
  const utcNumStr = String(utcNum);

  if (Number.isInteger(utcNum)) {
    return `${sign}${Math.round(utcNum)}:00`;
  } else {
    const utcArray = utcNumStr.split('.');
    utcArray[1] = String((utcNum % Number(utcArray[0])) * 60);
    return `${sign}${utcArray.join(':')}`;
  }
};

export const formatNoteDate = (dateInput) => {
  let dateObj = dateInput;
  if (typeof dateInput === 'string') {
    dateObj = new Date(dateInput);
  }
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return [time, date];
};
