/**
 * Capitalize the first letter of a given text.
 * @param text - The text to capitalize.
 * @returns The capitalized text.
 */
export function capitalize(text: string): string {
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

/**
 * Format a date string into "day de month del year".
 * @param dateString - The date string to format.
 * @returns The formatted date string.
 */
export function formatDate(dateString: Date): string {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${month} del ${year}`;
}

/**
 * Calculate the average rating from an array of reviews and format it to one decimal place.
 * @param reviews - The array of review objects.
 * @returns The average rating rounded to one decimal place.
 */
export function calculateAverageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) {
    return 0; // Return 0 if there are no reviews
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return parseFloat(averageRating.toFixed(1)); // Round to one decimal place
}