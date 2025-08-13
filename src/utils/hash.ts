// utils/hashedRandomString.ts
export async function hashedRandomString(length: number) {
  // Step 1: Generate secure random bytes
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));

  // Step 2: Hash them using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", randomBytes);

  // Step 3: Convert hash to hex
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

// utils/randomBase64.ts
export function randomBase64(length: number) {
  const bytes = new Uint8Array(length);

  // Use crypto if available, else fallback to Math.random
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  // Convert bytes to base64
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary) // base64
    .replace(/\+/g, "-") // URL-safe
    .replace(/\//g, "_")
    .replace(/=+$/, ""); // remove padding
}
