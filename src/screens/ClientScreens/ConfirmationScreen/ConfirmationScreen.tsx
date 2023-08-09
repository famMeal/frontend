import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Column, Columns, Container, Typography } from "components";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import type { RootStackParamList } from "types/navigation.types";

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
      setActiveScreen(route.name),
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
