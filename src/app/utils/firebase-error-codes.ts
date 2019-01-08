// Thrown if there already exists an account with the given email address.
export const SIGNUP_ERROR_EMAIL_ALREADY_IN_USE = "auth/email-already-in-use";

// Thrown if the email address is not valid.
export const SIGNUP_ERROR_INVALID_EMAIL = "auth/invalid-email";

// Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
export const SIGNUP_ERROR_OPERATION_NOT_ALLOWED = "auth/operation-not-allowed";

// Thrown if the password is not strong enough.
export const SIGNUP_ERROR_WEAK_PASSWORD = "auth/weak-password";

// Thrown if signing in with a credential from firebase.auth.EmailAuthProvider#credential
// and there is no user corresponding to the given email.
export const SIGNIN_ERROR_USER_NOT_FOUND = "auth/user-not-found";

// Thrown if signing in with a credential from firebase.auth.EmailAuthProvider#credential
// and the password is invalid for the given email, or if the account corresponding to the email does not have a password set.
export const SIGNIN_ERROR_WROND_PASSWORD = "auth/wrong-password";
