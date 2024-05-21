import Logo from "assets/svgs/logo.svg";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { COLOURS } from "constants/colours";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Columns>
        <Column
          alignItems="flex-end"
          columnWidth="twoThird"
          justifyContent="center">
          <Logo />
        </Column>
        <Column columnWidth="oneThird">
          <ActivityIndicator size="large" color={COLOURS.accent} />
        </Column>
      </Columns>
    </View>
  );
};

export { Loader };
