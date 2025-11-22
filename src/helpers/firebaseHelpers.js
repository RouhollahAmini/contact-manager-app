// Utility functions for handling Firebase errors and common operations

/**
 * Handle Firebase errors and convert them to user-friendly messages
 * @param {Error} error - The error object from Firebase
 * @returns {string} - User-friendly error message
 */
export const handleFirebaseError = (error) => {
  console.error("Firebase Error: ", error);
  
  // Return a user-friendly error message based on the error code
  switch (error.code) {
    case 'permission-denied':
      return 'شما اجازه دسترسی به این منبع را ندارید.';
    case 'not-found':
      return 'منبع مورد نظر یافت نشد.';
    case 'already-exists':
      return 'رکورد مورد نظر از قبل وجود دارد.';
    case 'unavailable':
      return 'سرویس در دسترس نیست. لطفاً بعداً تلاش کنید.';
    default:
      return 'خطایی در ارتباط با پایگاه داده رخ داده است.';
  }
};

/**
 * Format contact data to match Firestore structure
 * @param {Object} contact - The contact object
 * @returns {Object} - Formatted contact object
 */
export const formatContactData = (contact) => {
  // Convert mobile to string if it's a number
  if (typeof contact.mobile === 'number') {
    contact.mobile = contact.mobile.toString();
  }
  
  // Ensure group is stored as a string
  if (typeof contact.group === 'number') {
    contact.group = contact.group.toString();
  }
  
  return contact;
};