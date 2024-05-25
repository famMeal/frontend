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

  const renderRestaurantLocation = (location: string) =>
    location ? (
      <Typography type="S" weigth="bold">
        {location}
      </Typography>
    ) : null;

  const renderName = (name: string) => {
    const [restaurantName, restaurantLocation] = name.split("-");
    return (
      <>
        <Typography type="S" weigth="bold">
          {restaurantName}
        </Typography>
        {renderRestaurantLocation(restaurantLocation)}
      </>
    );
  };

  const renderAddress = (address: string) => {
    const [addressLine, city, postalCode] = address.split(",");

    return (
      <>
        <Typography type="S">{addressLine}</Typography>
        <Typography type="S">
          {postalCode} {city}
        </Typography>
      </>
    );
  };

  const renderLocations = () =>
    data?.map(location => (
      <RadioField key={location.id} value={location.id}>
        <Columns direction="column">
          <Column columnWidth="fullWidth">{renderName(location.name)}</Column>
          <Column columnWidth="fullWidth">
            {renderAddress(location.address)}
          </Column>
        </Columns>
      </RadioField>
    ));

  return (
    <Modal isModalVisible={isOpen} setModalVisible={setIsOpen}>
      <Columns isMarginless>
        <Column columnWidth="fullWidth">
          <Typography className="mt-2" type="H3" weigth="bold">
            Select Your Restaurant
          </Typography>
        </Column>
      </Columns>
      <Columns>
        <Column columnWidth="fullWidth" direction="column">
          <RadioGroup
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
