import VerifyCode from '../models/verify_code';

export async function CreateCode(user_id: string, code: string) {
  const now = Date.now();
  await VerifyCode.create({
    user_id: user_id,
    code: code,
    create_at: now
  });
}

export async function ExistCode(user_id: string) {
  const exist = await VerifyCode.findOne({ where: { user_id } });
  if (!exist) return null;
  return exist;
}

export async function DeleteCode(user_id: string) {
  await VerifyCode.destroy({ where: { user_id } });
}
