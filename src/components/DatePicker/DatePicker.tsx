import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import type { FC } from "react";
import React from "react";

interface Props {
  onChange: (name: string, date: Date) => void;
  name: string;
  value: Date;
}

const DatePicker: FC<Props> = ({ onChange, name, value }) => {
  const handleOnChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set") {
      const currentDate = selectedDate || value;
      onChange?.(name, currentDate);
    } else if (event.type === "dismissed") {
      return null;
    }
  };

  return (
    <DateTimePicker
      value={value}
      mode="date"
      is24Hour
      display="default"
      onChange={handleOnChange}
      minimumDate={new Date()}
    />
  );
};

export { DatePicker };
