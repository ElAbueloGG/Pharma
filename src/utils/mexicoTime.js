export const getMexicoTime = () => {
  // Zona horaria de México (UTC-6 o UTC-5 según horario de verano)
  const options = {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('es-MX', options);
  const parts = formatter.formatToParts(now);
  
  const result = {};
  parts.forEach(part => {
    result[part.type] = part.value;
  });
  
  return {
    date: `${result.year}-${result.month}-${result.day}`,
    time: `${result.hour}:${result.minute}:${result.second} ${result.dayPeriod}`,
    fullDate: new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))
  };
};