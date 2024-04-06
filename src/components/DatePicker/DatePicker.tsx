import DateTimePicker, {
  DateTimePickerAndroid,
  type AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import { Button } from "components/Button";
import React, { type FC } from "react";
import { Platform } from "react-native";

interface Props {
  onChange: (name: string, date: Date) => void;
  name: string;
  value: Date;
  minimumDate: Date;
  disabled: boolean;
}

const DatePicker: FC<Props> = ({
  onChange,
  name,
  value,
  minimumDate,
  disabled,
}) => {
  const handleAndroidDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onChange(name, selectedDate);
    }
  };

  const showDatePickerAndroid = () => {
    const params: AndroidNativeProps = {
      value: value,
      onChange: (_, date) => handleAndroidDateChange(date),
      minimumDate: minimumDate,
      mode: "date",
    };
    DateTimePickerAndroid.open(params);
  };

  if (Platform.OS === "android") {
    return (
      <Button
        className="-ml-6"
        theme="accent"
        isClean
        isOutlined
        onPress={disabled ? () => {} : showDatePickerAndroid}>
        {value.toDateString()}
      </Button>
    );
  } else {
    return (
      <DateTimePicker
        style={{
          marginLeft: -20,
        }}
        disabled
        value={value}
        mode="date"
        display="default"
        onChange={(event, date) => onChange(name, date as Date)}
        minimumDate={minimumDate}
      />
    );
  }
};

export { DatePicker };
