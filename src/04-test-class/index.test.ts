// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = new BankAccount(120);
    expect(account.getBalance()).toBe(120);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(120);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = new BankAccount(100);
    const otherAccount = new BankAccount(50);
    expect(() => account.transfer(150, otherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(100);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = new BankAccount(120);
    account.deposit(180);
    expect(account.getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(120);
    account.withdraw(20);
    expect(account.getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const account = new BankAccount(300);
    const otherAccount = new BankAccount(150);
    account.transfer(100, otherAccount);
    expect(account.getBalance()).toBe(200);
    expect(otherAccount.getBalance()).toBe(250);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(200);
    const balance = await account.fetchBalance();
    expect(balance).toBe(200);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(120);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(250);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(250);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
