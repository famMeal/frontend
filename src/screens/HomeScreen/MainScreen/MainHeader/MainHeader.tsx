import type { FC } from 'react';
import type { MainNavigationProps } from 'types/navigation.types';
import { View } from 'react-native';
import { Typography, Button } from 'components';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { getCSS } from './MainHeader.styles';

interface Props {
  title: string;
}

const MainHeader: FC<Props> = ({ title }) => {
  const { container, wrapper } = getCSS();
  const navigation = useNavigation<MainNavigationProps>();

  return (
    <View className={container}>
      <View className={wrapper}>
        <Button
          onPress={() => navigation.navigate('Meals')}
          theme="accent"
          isFullyRounded>
          <ArrowLeftCircleIcon color="white" size={30} />
        </Button>
      </View>
      <Typography type="H3" weigth="bold" className="text-white">
        {title}
      </Typography>
    </View>
  );
};

export { MainHeader };
