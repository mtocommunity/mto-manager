import CodesAuthorized from '../models/codes_authorized';

/**
 *
 * @param code user code
 * @returns true if the code is authorized, false otherwise
 */
export async function isAuthorized(code: string): Promise<boolean> {
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
  await CodesAuthorized.destroy({
    where: {
      code: code
    }
  });
}
