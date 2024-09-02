import { IconProp } from '@fortawesome/fontawesome-svg-core';
export interface MenuItem {
  link: string;
  label: string;
  icon: IconProp;
}

export interface IUser {
  name: string;
  lastName: string;
}

export const menuItems: MenuItem[] = [
  { link: '/home', label: 'Home', icon: 'home' },
  //   { link: '/about', label: 'About', icon: 'info-circle' },
  //   { link: '/secured-feat', label: 'Secured Feature', icon: 'lock' },
];

export const authUserDemo = {
  firstName: 'Admin',
  lastName: 'Test',
};
