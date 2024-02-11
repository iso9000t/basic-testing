import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create.mockClear().mockImplementation(() => mock);
    mock.get.mockClear().mockResolvedValueOnce({ data: 'expected data' });
  });
  test('should create instance with provided base url', async () => {
    const PATH = 'test-path';
    await throttledGetDataFromApi(PATH);
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const PATH = 'test-path';
    await throttledGetDataFromApi(PATH);
    expect(mock.get).toHaveBeenCalledWith(PATH);
  });

  test('should return response data', async () => {
    const PATH = 'test-path';
    const result = await throttledGetDataFromApi(PATH);
    expect(result).toEqual('expected data');
  });
});
