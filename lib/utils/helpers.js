export function generateId(length = 5) {
  // Define the character set containing uppercase letters and digits
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  // Create an empty string to store the ID
  let id = ''

  // Loop for the desired length of the ID
  for (let i = 0; i < length; i++) {
    // Select a random character from the character set
    id += chars[Math.floor(Math.random() * chars.length)]
  }

  // Return the generated ID
  return id
}
