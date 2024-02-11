import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 3, action: Action.Add })).toBe(13);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 6, action: Action.Subtract })).toBe(4);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Multiply })).toBe(25);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 18, b: 2, action: Action.Divide })).toBe(9);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 5, action: Action.Exponentiate })).toBe(
      32,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'x', b: 'y', action: Action.Add })).toBeNull();
  });
});
