import CodesAuthorized from '../models/codes_authorized';

const whitelist = false; // true or false

/**
 *
 * @param code user code
 * @returns true if the code is authorized, false otherwise
 */
export async function isAuthorized(code: string): Promise<boolean> {
  if (!whitelist) return true; // If the whitelist is disabled, return true

  return (
    (await CodesAuthorized.findOne({
      where: {
        code: code
      }
    })) !== null
  );
}

/**
 *
 * @param code user code
 */
export async function deleteCodeAuthorized(code: string): Promise<void> {
  if (!whitelist) return; // If the whitelist is disabled, return

  await CodesAuthorized.destroy({
    where: {
      code: code
    }
  });
}

/**
 *
 * @param code user code
 */
export async function deleteCodeAuthorizedCheck(code: string): Promise<boolean> {
  return CodesAuthorized.destroy({
    where: {
      code: code
    }
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

/**
 * Add a code to the authorized list
 * @param code user code
 * @returns true if the code was added, false otherwise
 */
export async function addCodeAuthorized(code: string): Promise<boolean> {
  return CodesAuthorized.create({
    code: code
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
