import type { FC, Dispatch, SetStateAction } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "types/navigation.types";
import { useEffect } from "react";
import { Columns, Container, Column, Typography } from "components";

type ConfirmationStackProps = NativeStackScreenProps<
  RootStackParamList,
  "Confirmation"
>;

interface Props extends ConfirmationStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const ConfirmationScreen: FC<Props> = ({
  route,
  navigation,
  setActiveScreen,
}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name)
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  return (
    <Container>
      <Columns>
        <Column>
          <Typography>Confirm</Typography>
        </Column>
      </Columns>
    </Container>
  );
};

export { ConfirmationScreen };
