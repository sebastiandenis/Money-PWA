import { Timestamp } from '@firebase/firestore-types';

export interface Budget {
    id: string;
    name: string;
    dateStart: Timestamp;
    dateEnd: Timestamp;
    totalCash: number;
    cashLeft: number;
}
