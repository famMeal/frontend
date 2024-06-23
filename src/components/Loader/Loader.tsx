import Logo from "assets/svgs/logo.svg";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";

const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Columns direction="column">
        <Column
          alignItems="center"
          columnWidth="fullWidth"
          justifyContent="center">
          <Animatable.View
            animation="bounceIn"
            iterationCount="infinite"
            duration={3000}>
            <Logo width={200} height={300} />
          </Animatable.View>
        </Column>
      </Columns>
    </View>
  );
};

export { Loader };
