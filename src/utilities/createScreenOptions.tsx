import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { COLOURS } from "constants/colours";
import {
  ListOrderedIcon,
  ShoppingCartIcon,
  UserCogIcon,
  UtensilsIcon,
} from "lucide-react-native";
import React from "react";

export const iconMap = (isScreenActive: boolean) =>
  ({
    utensils: (
      <UtensilsIcon
        size={20}
        color={isScreenActive ? COLOURS.primary : COLOURS.accent}
      />
    ),
    list: (
      <ListOrderedIcon
        size={20}
        color={isScreenActive ? COLOURS.primary : COLOURS.accent}
      />
    ),
    shopping: (
      <ShoppingCartIcon
        size={20}
        color={isScreenActive ? COLOURS.primary : COLOURS.accent}
      />
    ),
    user: (
      <UserCogIcon
        size={20}
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
  headerTitleAlign: "center",
  tabBarAllowFontScaling: true,
  tabBarLabelStyle: {
    color: isScreenActive ? COLOURS.primary : COLOURS.accent,
    fontFamily: "Khula-Bold",
    fontSize: 12,
  },
  ...rest,
});

export { createScreenOptions };
