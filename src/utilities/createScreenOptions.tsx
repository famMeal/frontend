import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { COLOURS } from 'constants/colours';
import {
  ShoppingBagIcon,
  CheckBadgeIcon,
  UserCircleIcon,
  ArchiveBoxIcon,
} from 'react-native-heroicons/solid';

export const iconMap = (isScreenActive: boolean) =>
  ({
    archive: (
      <ArchiveBoxIcon
        size={18}
        color={isScreenActive ? COLOURS.primary : COLOURS.accent}
      />
    ),
    badge: (
      <CheckBadgeIcon
        size={18}
        color={isScreenActive ? COLOURS.primary : COLOURS.accent}
      />
    ),
    shopping: (
      <ShoppingBagIcon
        size={18}
        color={isScreenActive ? COLOURS.primary : COLOURS.accent}
      />
    ),
    user: (
      <UserCircleIcon
        size={18}
        color={isScreenActive ? COLOURS.primary : COLOURS.accent}
      />
    ),
  } as const);

interface AdditionalScreenProps {
  isScreenActive: boolean;
  iconName: keyof typeof iconMap;
}

type Props = BottomTabNavigationOptions & AdditionalScreenProps;

const createScreenOptions = ({
  isScreenActive,
  iconName,
  ...rest
}: Props): BottomTabNavigationOptions => ({
  tabBarIcon: () => iconMap(isScreenActive)[iconName],
  headerTitleAlign: 'center',
  tabBarAllowFontScaling: true,
  tabBarLabelStyle: {
    color: isScreenActive ? COLOURS.primary : COLOURS.accent,
    fontFamily: 'Khula-Bold',
    fontSize: 12,
  },
  ...rest,
});

export { createScreenOptions };
