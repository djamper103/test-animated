import {ImageSourcePropType} from 'react-native';

import DARK_THEME from '../../assets/images/circle_menu/dark/dark.png';
import LIGHT_THEME from '../../assets/images/circle_menu/light/light.png';

import MENU from '../../assets/images/circle_menu/menu/menu.png';

export const DARK_THEME_ICON = DARK_THEME;
export const LIGHT_THEME_ICON = LIGHT_THEME;

export const MENU_ICON = MENU;

type ImagesMap = {[key: string]: ImageSourcePropType};

export const CIRCLE_MENU_ICONS_BY_KEYS: ImagesMap = {
  0: DARK_THEME_ICON,
  1: LIGHT_THEME_ICON,
  2: DARK_THEME_ICON,
  3: LIGHT_THEME_ICON,
  4: DARK_THEME_ICON,
  5: LIGHT_THEME_ICON,
  6: DARK_THEME_ICON,
  7: LIGHT_THEME_ICON,
};
