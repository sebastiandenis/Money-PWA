import { UserConfig } from './user-config.model';

export interface User {
    id: string;
    email: string;
    name: string;
    config: UserConfig;
    userId;

}
