import DateTimePicker, {
  DateTimePickerAndroid,
  type AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import { DateTime } from "luxon";
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
  // Convert Date to Luxon DateTime in Toronto timezone
  const toTorontoDateTime = (date: Date) => {
    return DateTime.fromJSDate(date).setZone("America/Toronto");
  };

  const handleAndroidTimeChange = (selectedTime: Date | undefined) => {
    if (selectedTime) {
      const torontoTime = toTorontoDateTime(selectedTime).toJSDate();
      onTimeChange(torontoTime);
    }
  };

  const params: AndroidNativeProps = {
    value: toTorontoDateTime(value).toJSDate(),
    onChange: (_, time) => handleAndroidTimeChange(time),
    mode: "time",
    minimumDate: toTorontoDateTime(minimumDate).toJSDate(),
  };

  useEffect(() => {
    if (Platform.OS === "android" && isClosed) {
      DateTimePickerAndroid.dismiss("time");
    }
  }, [isClosed]);

  const handleChange = (_: any, date: Date | undefined) => {
    if (date) {
      const torontoTime = toTorontoDateTime(date).toJSDate();
      onTimeChange(torontoTime);
    }
  };

  if (Platform.OS === "android") {
    return <>{DateTimePickerAndroid.open(params)}</>;
  } else {
    return (
      <DateTimePicker
        minimumDate={toTorontoDateTime(minimumDate).toJSDate()}
        value={toTorontoDateTime(value).toJSDate()}
        mode="time"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={handleChange}
      />
    );
  }
};

export { TimePicker };
