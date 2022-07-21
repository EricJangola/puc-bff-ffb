export function generatePassword(length: number = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%@$#&+';
  const charactersLength = characters.length;

  return Array(length)
    .fill(0)
    .map(() => {
      const random = Math.floor(Math.random() * charactersLength);
      return characters.charAt(random);
    })
    .join('');
}
export default {};
