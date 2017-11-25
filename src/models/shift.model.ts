export interface Shift {
    id: string;
    amount: number;
    wentTo?: string; // budget-line id
    cameFrom?: string; // budget-line id
}
