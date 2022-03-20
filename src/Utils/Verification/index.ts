

export function verificatioExpiration(minToAdd: number = 10): string {
    return (new Date().getTime() + minToAdd*60000).toString();
}