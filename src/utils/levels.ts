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

export function buildExperienceBar(current: number, needed: number, length: number = 8): string {
  const percentage = Math.round((current / needed) * length);

  // If the percentage is 0, the bar is empty
  if (percentage === 0) return `${EMOJI.VOID.LEFT}${EMOJI.VOID.CENTER.repeat(length - 2)}${EMOJI.VOID.RIGHT}`;

  // If the percentage is equal to the length, the bar is full
  if (percentage === length) return `${EMOJI.FULL.LEFT}${EMOJI.FULL.CENTER.repeat(length - 2)}${EMOJI.FULL.RIGHT}`;

  // Otherwise, the bar is partially full
  return `${EMOJI.FULL.LEFT}${EMOJI.FULL.CENTER.repeat(percentage - 1)}${EMOJI.VOID.CENTER.repeat(length - percentage - 1)}${EMOJI.VOID.RIGHT}`;
}
