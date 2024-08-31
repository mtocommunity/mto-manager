import Technologies from '../models/technologies';
import User from '../models/user';
import UserProfile from '../models/user_profile';
import UserProfileTechnologies from '../models/user_profile_technologies';

/**
 * Get the profile of a user
 * @param discord_id discord user
 * @returns user profile
 */
export async function getUserProfile(discord_id: string): Promise<UserProfile | null> {
  // TODO: Use cache

  const user = await User.findOne({
    where: {
      discord_id: discord_id
    },
    include: [
      {
        model: UserProfile,
        as: 'profile',
        include: [
          {
            model: Technologies,
            as: 'technologies'
          }
        ]
      }
    ]
  });

  if (!user) return null;

  // If the user has a profile, return it
  if (user.profile) return user.profile;

  // If the user does not have a profile, create one
  const profile = new UserProfile({
    user_id: user.user_id
  });

  await profile.save();

  return profile;
}

/**
 * Get the technologies of a user
 * @param discord_id discord user
 * @returns technologies of the user
 */
export async function getTechnologiesOfUser(discord_id: string): Promise<Technologies[]> {
  const profile = await getUserProfile(discord_id);

  if (!profile || !profile.technologies) return [];

  return profile.technologies;
}

/**
 * Get the ids of the technologies
 * @param technologies technologies names to get the ids
 * @returns ids of the technologies
 */
export async function getTechnologiesIdsOfName(technologies: string[]): Promise<number[]> {
  return Technologies.findAll({
    where: {
      name: technologies
    }
  }).then((technologies) => technologies.map((technology) => technology.technology_id));
}

/**
 * Add a technology to a user
 * @param discord_id discord user
 * @param technologies technologies to add
 */
export async function addTechnologyToUser(discord_id: string, technologies: string[]): Promise<void> {
  const profile = await getUserProfile(discord_id);

  if (!profile || !profile.technologies) return;

  // Get the ids of the technologies
  const technology_ids = (await getTechnologiesIdsOfName(technologies))
    // Filter the technologies that the user already has
    .filter((t) => !profile.technologies?.map((t) => t.technology_id).includes(t));

  if (technology_ids.length === 0) return;

  await UserProfileTechnologies.bulkCreate(
    technology_ids.map((technology_id) => ({
      user_id: profile.user_id,
      technology_id: technology_id
    }))
  );
}

/**
 * Remove a technology from a user
 * @param discord_id discord user
 * @param technologies technologies to remove
 */
export async function removeTechnologyFromUser(discord_id: string, technologies: string[]): Promise<void> {
  const profile = await getUserProfile(discord_id);

  if (!profile || !profile.technologies) return;

  // Get the ids of the technologies
  const technology_ids = await getTechnologiesIdsOfName(technologies);

  if (technology_ids.length === 0) return;

  await UserProfileTechnologies.destroy({
    where: {
      user_id: profile.user_id,
      technology_id: technology_ids
    }
  });
}

/**
 * Set the technologies of a user
 * @param discord_id discord user
 * @param technologies technologies to set
 */
export async function setTechnologiesToUser(discord_id: string, technologies: string[]): Promise<void> {
  const profile = await getUserProfile(discord_id);

  if (!profile || !profile.technologies) return;

  // Get the ids of the technologies
  const technology_ids = await getTechnologiesIdsOfName(technologies);

  if (technology_ids.length === 0) return;

  await UserProfileTechnologies.destroy({
    where: {
      user_id: profile.user_id
    }
  });

  await UserProfileTechnologies.bulkCreate(
    technology_ids.map((technology_id) => ({
      user_id: profile.user_id,
      technology_id: technology_id
    }))
  );
}
