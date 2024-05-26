import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Container } from "components";
import type { Dispatch, FC, SetStateAction } from "react";
import { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { useLogoutMutation } from "shared/useLogoutMutation";
import type { RootStackParamList } from "types/navigation.types";
import { SkeletonUserForm, UserForm } from "./UserForm";
import { useGetUserQuery } from "./useGetUserQuery";

type ProfileStackProps = NativeStackScreenProps<RootStackParamList, "Profile">;

interface Props extends ProfileStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const ProfileScreen: FC<Props> = ({ route, navigation, setActiveScreen }) => {
  const [logout, { loading: isSignOutLoading }] = useLogoutMutation();
  const { userID } = route?.params ?? {};
  const { data, loading, refetch } = useGetUserQuery({
    skip: !userID,
    variables: {
      id: userID,
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveScreen(route.name);
      refetch();
    });
    return unsubscribe;
  }, [navigation, setActiveScreen, route.name, refetch]);

  const {
    id: unusedId,
    __typename: unusedTypeName,
    ...rest
  } = data?.user ?? {};

  const renderUserForm = useCallback(
    () => (loading ? <SkeletonUserForm /> : <UserForm user={rest} />),
    [loading]
  );

  const onPress = () => {
    logout({
      onCompleted: async () => {
        try {
          await AsyncStorage.removeItem("credentials");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    });
  };

  const showAlert = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Logout", onPress },
    ]);
  };

  return (
    <Container>
      {renderUserForm()}
      <Box>
        <Button isLoading={isSignOutLoading} onPress={showAlert}>
          Sign out
        </Button>
      </Box>
    </Container>
  );
};

export { ProfileScreen };
