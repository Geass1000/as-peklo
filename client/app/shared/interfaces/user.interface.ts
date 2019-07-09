import { Enums } from './../../../../shared';

export interface Social {
  provider: Enums.User.SocialProvider;
  icon: string;
  label: string;
}
