import {
  formatUtcOffset,
  formatNoteDate,
  sortAlphabetically,
} from './helperFunctions';

describe('Time is properly formatted', () => {
  describe('Zero timezone', () => {
    it('-0.0', () => {
      expect(formatUtcOffset('-0.0')).toBe('+0');
    });
    it('0.0', () => {
      expect(formatUtcOffset('0.0')).toBe('+0');
    });
  });

  describe('Negative timezones', () => {
    it('-4.5', () => {
      expect(formatUtcOffset('-4.5')).toBe('-4:30');
    });
    it('-3.0', () => {
      expect(formatUtcOffset('-3.0')).toBe('-3:00');
    });
  });

  describe('Postive timezones', () => {
    it('5.5', () => {
      expect(formatUtcOffset('5.5')).toBe('+5:30');
    });
    it('1.0', () => {
      expect(formatUtcOffset('1.0')).toBe('+1:00');
    });
  });
});

describe('time-date for a note is properly formatted', () => {
  let dateObj, dateStr, time, date;
  beforeAll(() => {
    dateObj = new Date();
    dateStr = dateObj.toString();
    time = dateObj.toLocaleTimeString();
    date = dateObj.toLocaleDateString();
  });

  it('When input is a date string', () => {
    expect(formatNoteDate(dateObj)).toStrictEqual([time, date]);
  });
  it('When input is a date object', () => {
    expect(formatNoteDate(dateStr)).toStrictEqual([time, date]);
  });
});

describe('Sorts alphabetically', () => {
  describe('Lowercase letters', () => {
    it('In ascending order', () => {
      expect(sortAlphabetically('a', 'b')).toBe(-1);
    });
    it('In descending order', () => {
      expect(sortAlphabetically('b', 'a')).toBe(1);
    });
  });

  describe('uppercase letters', () => {
    it('In ascending order', () => {
      expect(sortAlphabetically('A', 'B')).toBe(-1);
    });
    it('In descending order', () => {
      expect(sortAlphabetically('B', 'A')).toBe(1);
    });
  });

  describe('mixed-case letters', () => {
    it('In ascending order', () => {
      expect(sortAlphabetically('A', 'b')).toBe(-1);
    });
    it('In descending order', () => {
      expect(sortAlphabetically('B', 'a')).toBe(1);
    });
  });
});
