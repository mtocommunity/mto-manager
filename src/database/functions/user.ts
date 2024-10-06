import User from '../models/user';

export async function getUserInformation(discord_id: string): Promise<User | null> {
  return await User.findOne({
    where: {
      discord_id: discord_id
    },
    include: ['verifyCode']
  });
}
