export interface NewShiftData {
  amount: number;
  cameFrom: string;
  wentTo: string;
  description?: string;
}


export interface Shift {
    id: string;
    amount: number;
    budgetLineId: string;
    wentTo?: string; // budget-line id
    cameFrom?: string; // budget-line id
    description?: string;
    when?: number;
}
