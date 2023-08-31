export default function toStringRuDate(str: string): string {
    const ruDate = str.split('-').reverse().join('.');
    return ruDate;
}