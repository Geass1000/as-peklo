import { Social } from './../interfaces/user.interface';
import { User } from 'gafrome-core/shared/enums';

export const Socials: Social[] = [
  {
    provider: User.SocialProvider.Google,
    icon: 'google-plus-g',
    label: `Google+`,
  },
  {
    provider: User.SocialProvider.Facebook,
    icon: 'facebook-f',
    label: `Facebook`,
  },
  {
    provider: User.SocialProvider.Twitter,
    icon: 'twitter',
    label: `Twitter`,
  },
  {
    provider: User.SocialProvider.Vkontakte,
    icon: 'vk',
    label: `Vkontakte`,
  },
];
