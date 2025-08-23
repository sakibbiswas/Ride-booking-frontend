export const money = (n?: number) => (typeof n === 'number' ? `৳ ${n.toFixed(0)}` : '৳ 0')
export const dt = (s?: string) => (s ? new Date(s).toLocaleString(undefined, { hour12: true }) : '-')
