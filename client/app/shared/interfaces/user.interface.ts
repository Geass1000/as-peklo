import { User } from 'gafrome-core/shared/enums';

export interface Social {
  provider: User.SocialProvider;
  icon: string;
  label: string;
}
