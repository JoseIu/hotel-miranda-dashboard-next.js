export const formatter = (value: string): string => {
  const date = new Date(value);

  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
};
