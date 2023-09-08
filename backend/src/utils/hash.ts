import { compare, hash, genSalt } from 'bcrypt';

export async function hashText(text: string, length?: number) {
  const salt = await genSalt(length || 10);
  return await hash(text, salt);
}

export async function compareHash(text: string, hash: string) {
  return await compare(text, hash);
}
