import type { FC, Dispatch, SetStateAction } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "types/navigation.types";

import { useCallback, useEffect } from "react";
import { Container } from "components";
import { useGetUserQuery } from "./useGetUserQuery";
import { SkeletonUserForm, UserForm } from "./UserForm";

type ProfileStackProps = NativeStackScreenProps<RootStackParamList, "Profile">;

interface Props extends ProfileStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const ProfileScreen: FC<Props> = ({ route, navigation, setActiveScreen }) => {
  const { data, loading } = useGetUserQuery({
    variables: {
      id: "1",
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveScreen(route.name);
    });
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  const { id, __typename, ...rest } = data?.user ?? {};

  const renderUserForm = useCallback(
    () => (loading ? <SkeletonUserForm /> : <UserForm user={rest} />),
    [loading]
  );

  return <Container>{renderUserForm()}</Container>;
};

export { ProfileScreen };
