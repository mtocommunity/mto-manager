import { UserTeamRole } from '../../ts';
import Team from '../models/team';
import User from '../models/user';
import UserTeam from '../models/user_team';

/**
 * Get team by name
 * @param teamName team name in database
 * @returns Team, null if the team does not exist
 */
export async function getTeam(teamName: string): Promise<Team | null> {
  return await Team.findOne({
    where: {
      name: teamName
    }
  });
}

/**
 * Get teams of a user
 * @param discord_id Discord user_id
 * @returns Teams of the user, null if the user does not exist
 */
export async function getTeamsOfUser(discord_id: string): Promise<Team[] | null> {
  const user = await User.findOne({
    where: {
      discord_id
    },
    include: 'teams'
  });

  if (!user) return null;

  return user.getDataValue('teams');
}

/**
 * Join user to a team
 * @param discord_id Discord user_id
 * @param teamName team name in database
 * @returns true if the user joined the team, false otherwise
 */
export async function joinTeam(discord_id: string, teamName: string): Promise<boolean> {
  const user = await User.findOne({
    where: {
      discord_id
    },
    include: 'teams'
  });

  if (!user) return false;

  const team = await getTeam(teamName);

  if (!team) return false;

  const relation = new UserTeam({
    user_id: user.user_id,
    team_id: team.team_id,
    role: UserTeamRole.PARTICIPANT
  });

  try {
    await relation.save();
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Leave user from a team
 * @param discord_id Discord user_id
 * @param teamName team name in database
 * @returns true if the user left the team, false otherwise
 */
export async function leaveTeam(discord_id: string, teamName: string): Promise<boolean> {
  const user = await User.findOne({
    where: {
      discord_id
    },
    include: 'teams'
  });

  if (!user) return false;

  const team = await getTeam(teamName);

  if (!team) return false;

  const relation = await UserTeam.findOne({
    where: {
      user_id: user.user_id,
      team_id: team.team_id
    }
  });

  if (!relation) return false;

  try {
    await relation.destroy();
    return true;
  } catch (error) {
    return false;
  }
}
