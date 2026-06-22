export function formatTime(seconds: number) {
  const secs = seconds % 60;

  return ` ${secs}.000`;
}
