import fs from 'node:fs';
import path from 'node:path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout').mockClear();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callbackFn = jest.fn();
    const timeoutDuration = 1200;
    doStuffByTimeout(callbackFn, timeoutDuration);

    expect(setTimeout).toHaveBeenCalledWith(callbackFn, timeoutDuration);
  });

  test('should call callback only after timeout', () => {
    const callbackFn = jest.fn();
    const timeoutDuration = 1200;
    doStuffByTimeout(callbackFn, timeoutDuration);

    expect(callbackFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeoutDuration);
    expect(callbackFn).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalCallback = jest.fn();
    const intervalTime = 1500;
    doStuffByInterval(intervalCallback, intervalTime);
    jest.advanceTimersByTime(4500);
    expect(intervalCallback).toBeCalledTimes(3);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockedCallback = jest.fn();
    const period = 1600;
    doStuffByInterval(mockedCallback, period);
    jest.advanceTimersByTime(4800);
    expect(mockedCallback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePathForTest = 'testDocument.txt';
    const mockPathJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(filePathForTest);
    expect(mockPathJoin).toBeCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const result = await readFileAsynchronously('invisibleFile.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Unique content for testing file read.';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);
    const fetchedContent = await readFileAsynchronously('existingFile.txt');
    expect(fetchedContent).toEqual(fileContent);
  });
});
