import { UserConfig } from './user-config.model';
import { UserProfileMedia } from './user-profile-media.model';

export interface User {
    id: string;
    email: string;
    name: string;
    config: UserConfig;
    profileMedia: UserProfileMedia;
    userId;

}
