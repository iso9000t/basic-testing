import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const inputArray = [1, 2, 3];
    const expectedStructure = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    const resultingList = generateLinkedList(inputArray);
    expect(resultingList).toStrictEqual(expectedStructure);
  });

  test('should generate linked list from values 2', () => {
    const inputSequence = [1, 2, 3];
    const resultingList = generateLinkedList(inputSequence);
    expect(resultingList).toMatchSnapshot();
  });
});
