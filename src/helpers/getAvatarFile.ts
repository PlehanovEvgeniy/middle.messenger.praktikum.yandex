export default function getAvatarFile() {
  const input = document.getElementById("avatar") as HTMLInputElement;

  if (input && input.files) {
    return input.files[0];
  }
  return null;
}
