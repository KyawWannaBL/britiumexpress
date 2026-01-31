export function humanizeFirebaseAuthError(err: unknown): string {
  const code = (err as any)?.code as string | undefined;

  switch (code) {
    case "auth/invalid-credential":
      return "Invalid email or password (or the account does not exist in Firebase Authentication).";
    case "auth/user-not-found":
      return "No account found for this email. Please create an account first.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-email":
      return "Invalid email format.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is disabled in Firebase Console.";
    default:
      return (err as any)?.message?.replace(/^Firebase:\s*/i, "") ?? "Sign in failed.";
  }
}