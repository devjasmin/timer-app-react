export function formatTime(seconds: number) {
  /*const mins = Math.floor(seconds / 60);*/
  const secs = seconds % 60;

  return `${secs.toFixed(3).padStart(5, "0")}`;
}
