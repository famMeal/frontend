import { Column, Columns, Modal, RadioGroup, Typography } from "components";
import { RadioField } from "components/RadioGroup/RadioField";
import { useState, type FC } from "react";
import { useRestaurantLocations } from "./useRestaurantLocations";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  restaurantName: string;
  city: string;
}

const RestaurantsLocationsModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  restaurantName,
  city,
}) => {
  const [selectedTip, setSelectedTip] = useState("0");
  const { data, loading, error } = useRestaurantLocations(restaurantName, city);

  const renderLocations = () =>
    data?.map(location => (
      <RadioField key={location.id} value={location.id}>
        <Columns direction="column">
          <Column columnWidth="fullWidth">
            <Typography type="S" weigth="bold">
              {location.name}
            </Typography>
          </Column>
          <Column columnWidth="fullWidth">
            <Typography type="S">{location.address}</Typography>
          </Column>
        </Columns>
      </RadioField>
    ));

  return (
    <Modal isModalVisible={isOpen} setModalVisible={setIsOpen}>
      <Columns>
        <Column columnWidth="fullWidth">
          <Typography>Select Your Restaurant</Typography>
        </Column>
      </Columns>
      <Columns>
        <Column columnWidth="fullWidth" direction="column">
          <RadioGroup
            scrollEnabled
            direction="column"
            selectedValue={selectedTip}
            onValueChange={value => setSelectedTip(value)}>
            {renderLocations()}
          </RadioGroup>
        </Column>
      </Columns>
    </Modal>
  );
};

export { RestaurantsLocationsModal };
