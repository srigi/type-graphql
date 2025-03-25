const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function getRandomString(length = 10) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += pool.charAt(Math.floor(Math.random() * pool.length));
  }

  return result;
}
