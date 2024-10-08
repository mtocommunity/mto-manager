const EMOJI = {
  VOID: {
    LEFT: '<:void_left:1279226380118130832>',
    CENTER: '<:void_center:1279226391841345567>',
    RIGHT: '<:void_right:1279226366763728950>'
  },
  FULL: {
    LEFT: '<:void_left:1279226413274234981>',
    CENTER: '<:void_center:1279226427841056861>',
    RIGHT: '<:void_right:1279226402901721129>'
  }
};

const DIFFICULTY_MULTIPLIER = 3;

export function buildExperienceBar(current: number, needed: number, length: number = 8): string {
  const percentage = Math.round((current / needed) * length);

  // If the percentage is 0, the bar is empty
  if (percentage === 0) return `${EMOJI.VOID.LEFT}${EMOJI.VOID.CENTER.repeat(length - 2)}${EMOJI.VOID.RIGHT}`;

  // If the percentage is equal to the length, the bar is full
  if (percentage === length) return `${EMOJI.FULL.LEFT}${EMOJI.FULL.CENTER.repeat(length - 2)}${EMOJI.FULL.RIGHT}`;

  // Otherwise, the bar is partially full
  return `${EMOJI.FULL.LEFT}${EMOJI.FULL.CENTER.repeat(percentage - 1)}${EMOJI.VOID.CENTER.repeat(length - percentage - 1)}${EMOJI.VOID.RIGHT}`;
}

export function requiredExperience(level: number): number {
  if (level >= 30) {
    return (62 + (level - 30) * 7) * DIFFICULTY_MULTIPLIER;
  } else if (level >= 15) {
    return (17 + (level - 15) * 3) * DIFFICULTY_MULTIPLIER;
  } else {
    return 17 * DIFFICULTY_MULTIPLIER;
  }
}

export function acumulateExperience(level: number): number {
  let total = 0;
  for (let i = 0; i < level; i++) {
    total += requiredExperience(i);
  }

  return total;
}
