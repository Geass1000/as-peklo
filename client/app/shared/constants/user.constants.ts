import { Social } from './../interfaces/user.interface';
import { Enums } from './../../../../shared';

export const Socials: Social[] = [
  {
    provider: Enums.User.SocialProvider.Google,
    icon: 'google-plus-g',
    label: `Google+`,
  },
  {
    provider: Enums.User.SocialProvider.Facebook,
    icon: 'facebook-f',
    label: `Facebook`,
  },
  {
    provider: Enums.User.SocialProvider.Twitter,
    icon: 'twitter',
    label: `Twitter`,
  },
  {
    provider: Enums.User.SocialProvider.Vkontakte,
    icon: 'vk',
    label: `Vkontakte`,
  },
];
