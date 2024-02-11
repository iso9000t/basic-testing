import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 10, b: 3, action: Action.Add, expected: 13 },
  { a: 10, b: 6, action: Action.Subtract, expected: 4 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 18, b: 2, action: Action.Divide, expected: 9 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 2, b: 1, action: 'invalid', expected: null },
  { a: 'x', b: 'y', action: Action.Add, expected: null },
];

describe('simpleCalculator with different test cases', () => {
  test.each(testCases)(
    'given inputs with a: %p, b: %p, and action: %p, expects calculation to be correct',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
