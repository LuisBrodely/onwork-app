/**
 * Capitalize the first letter of a given text.
 * @param text - The text to capitalize.
 * @returns The capitalized text.
 */
export function capitalize(text: string) {
  const firstLetter = text.charAt(0);
  const rest = text.slice(1);
  return firstLetter.toUpperCase() + rest;
}

/**
 * Format a phone number by adding spaces.
 * @param phoneNumber - The phone number to format.
 * @returns The formatted phone number.
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Check if the phone number has exactly 10 digits
  if (!/^\d{10}$/.test(phoneNumber)) {
    return phoneNumber; // Return the original phone number if it's not 10 digits
  }

  // Use regular expression to format the phone number
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
}