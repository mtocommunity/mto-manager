import { TechnologyCategory } from '../../ts';
import { requiredExperience } from '../../utils';
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
export async function getTechnologiesOfName(technologies: string[]): Promise<Technologies[]> {
  return await Technologies.findAll({
    where: {
      name: technologies
    }
  });
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
  const technology_ids = (await getTechnologiesOfName(technologies))
    // Filter the technologies that the user already has
    .filter((t) => !profile.technologies?.map((t) => t.technology_id).includes(t.technology_id))
    .map((t) => t.technology_id);

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
  const technology_ids = await (await getTechnologiesOfName(technologies)).map((t) => t.technology_id);

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
  const technology_ids = (await getTechnologiesOfName(technologies)).map((t) => t.technology_id);

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

// SetTechnologies but with a category
export async function setTechnologiesToUserWithCategory(discord_id: string, technologies: string[], category: TechnologyCategory): Promise<void> {
  const profile = await getUserProfile(discord_id);

  if (!profile || !profile.technologies) return;

  // Get all the technologies of the category
  const allCategoryTechnologies = await Technologies.findAll({
    where: {
      category: category
    }
  });

  if (allCategoryTechnologies.length === 0) return;

  // Delete all the technologies of the user
  await UserProfileTechnologies.destroy({
    where: {
      user_id: profile.user_id,
      technology_id: allCategoryTechnologies.map((t) => t.technology_id)
    }
  });

  // Get the ids of the technologies
  const technology_ids = allCategoryTechnologies.filter((t) => technologies.includes(t.name)).map((t) => t.technology_id);

  // Create relationships
  await UserProfileTechnologies.bulkCreate(
    technology_ids.map((technology_id) => ({
      user_id: profile.user_id,
      technology_id: technology_id
    }))
  );
}

/**
 * Method to add experience to a user
 * @param discord_id discord user
 * @param experience experience to add
 * @returns void
 */
export async function addExperienceToUser(discord_id: string, experience: number): Promise<void> {
  const profile = await getUserProfile(discord_id);

  if (!profile) return;

  if (experience < 0) return removeExperienceFromUser(discord_id, experience);

  const requires = requiredExperience(profile.level + 1);

  if (experience >= requires) {
    // Add experience and level up
    profile.experience = (experience - requires) % requires;
    profile.level += 1;
    await profile.save();
    return;
  }

  // Add experience
  profile.experience += experience;
  await profile.save();
  return;
}

export async function removeExperienceFromUser(discord_id: string, experience: number): Promise<void> {
  const profile = await getUserProfile(discord_id);

  if (!profile) return;

  if (experience < 0) return addExperienceToUser(discord_id, experience);

  const requires = requiredExperience(profile.level);

  if (profile.experience < experience) {
    // Remove experience and level down
    profile.experience = requires - (experience - profile.experience);
    profile.level -= 1;
    await profile.save();
    return;
  }

  // Remove experience
  profile.experience -= experience;
  await profile.save();
}
