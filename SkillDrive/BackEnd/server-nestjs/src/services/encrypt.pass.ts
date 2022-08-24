import * as bcrypt from 'bcrypt';

export const encryptPassword = (pass: string): string => {
  
  const saltRounds: number = 10;

  const encryptedPass = bcrypt.hashSync(pass, saltRounds)  
  return encryptedPass;
}