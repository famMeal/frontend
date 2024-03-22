import DateTimePicker, {
  DateTimePickerAndroid,
  type AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import React, { useEffect, type FC } from "react";
import { Platform } from "react-native";

interface Props {
  onTimeChange: (time: Date) => void;
  value: Date;
  minimumDate: Date;
  isClosed: boolean;
}

const TimePicker: FC<Props> = ({
  onTimeChange,
  value,
  minimumDate,
  isClosed,
}) => {
  const handleAndroidTimeChange = (selectedTime: Date | undefined) => {
    if (selectedTime) {
      onTimeChange(selectedTime);
    }
  };

  const params: AndroidNativeProps = {
    value,
    onChange: (_, time) => handleAndroidTimeChange(time),
    mode: "time",
    minimumDate,
  };

  useEffect(() => {
    if (Platform.OS === "android" && isClosed) {
      DateTimePickerAndroid.dismiss("time");
    }
  }, [isClosed]);

  if (Platform.OS === "android") {
    return <>{DateTimePickerAndroid.open(params)}</>;
  } else {
    return (
      <DateTimePicker
        minimumDate={minimumDate}
        value={value}
        mode="time"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={(_, date) => onTimeChange(date as Date)}
      />
    );
  }
};

export { TimePicker };
