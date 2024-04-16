const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Validates a UUID using a regular expression.
 * @param {string} uuid - The UUID to validate.
 * @returns {boolean} True if the UUID is valid, otherwise false.
 */
export function isValidUUID(uuid) {
  return uuidRegex.test(uuid);
}
