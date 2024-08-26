import { randomBytes } from 'crypto';

export function generateRandomString(length: number): string {
  return randomBytes(length).toString('hex'); // 기본 16진수 문자열로 변환
}