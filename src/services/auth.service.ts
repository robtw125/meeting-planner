import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export function isPasswordCorrect(password: string) {
  const websitePassword = process.env.WEBSITE_PASSWORD;

  if (!websitePassword) return true;

  if (!password) return false;

  return websitePassword === password;
}

export function isJwtValid(token: string): boolean {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload ? true : false;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function createJwt(): string {
  const payload = {};
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  return token;
}
