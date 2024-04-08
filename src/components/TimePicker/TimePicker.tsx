import DateTimePicker, {
  DateTimePickerAndroid,
  type AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import type { FC } from "react";
import React, { useEffect } from "react";
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
      // Convert local time to UTC
      const utcTime = new Date(
        Date.UTC(
          selectedTime.getFullYear(),
          selectedTime.getMonth(),
          selectedTime.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes()
        )
      );

      console.log(utcTime);
      onTimeChange(utcTime);
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

  const handleChange = (_: any, date: Date | undefined) => {
    if (date) {
      const utcTime = new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes()
        )
      );
      onTimeChange(utcTime);
    }
  };

  if (Platform.OS === "android") {
    return <>{DateTimePickerAndroid.open(params)}</>;
  } else {
    return (
      <DateTimePicker
        minimumDate={minimumDate}
        value={value}
        mode="time"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={handleChange}
      />
    );
  }
};

export { TimePicker };
