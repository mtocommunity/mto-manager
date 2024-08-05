import VerifyCode from '../models/verify_code';

export async function createCode(discord_id: string, code: string) {
  const now = Date.now();
  await VerifyCode.create({
    discord_id: discord_id,
    code: code,
    create_at: now
  });
}

export async function existCode(discord_id: string) {
  const exist = await VerifyCode.findOne({ where: { discord_id: discord_id } });
  if (!exist) return null;
  return exist;
}

export async function deleteCode(discord_id: string) {
  await VerifyCode.destroy({ where: { discord_id: discord_id } });
}
