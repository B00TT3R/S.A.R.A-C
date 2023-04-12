const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
});
export default function TimeFormatter(value: string){
    const date = new Date(value);
    return formatter.format(date);
}