import User from '../models/user';

export async function getUserInformation(discord_id: string): Promise<User | null> {
  return await User.findOne({
    where: {
      discord_id: discord_id
    },
    include: ['verifyCode']
  });
}

export async function verifyUser(discord_id: string): Promise<boolean> {
  const userData = await User.findOne({
    where: {
      discord_id: discord_id
    }
  });

  if (!userData) return false;

  userData.verified = true;
  await userData.save();

  return true;
}

export async function unverifyUser(discord_id: string): Promise<boolean> {
  const userData = await User.findOne({
    where: {
      discord_id: discord_id
    }
  });

  if (!userData) return false;

  userData.verified = false;
  await userData.save();

  return true;
}
