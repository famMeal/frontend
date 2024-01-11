import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Dispatch, FC, SetStateAction } from "react";
import type { RootStackParamList } from "types/navigation.types";

import { Container } from "components";
import { useCallback, useEffect } from "react";
import { SkeletonUserForm, UserForm } from "./UserForm";
import { useGetUserQuery } from "./useGetUserQuery";

type ProfileStackProps = NativeStackScreenProps<RootStackParamList, "Profile">;

interface Props extends ProfileStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const ProfileScreen: FC<Props> = ({ route, navigation, setActiveScreen }) => {
  const { userID } = route?.params ?? {};
  const { data, loading } = useGetUserQuery({
    skip: !userID,
    variables: {
      id: userID,
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveScreen(route.name);
    });
    return unsubscribe;
  }, [navigation, setActiveScreen, route.name]);

  const {
    id: unusedId,
    __typename: unusedTypeName,
    ...rest
  } = data?.user ?? {};

  const renderUserForm = useCallback(
    () => (loading ? <SkeletonUserForm /> : <UserForm user={rest} />),
    [loading],
  );

  return <Container>{renderUserForm()}</Container>;
};

export { ProfileScreen };
