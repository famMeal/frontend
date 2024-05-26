import {
  Box,
  Column,
  Columns,
  Modal,
  RadioField,
  RadioGroup,
  Skeleton,
  Typography,
} from "components";
import { useEffect, useState, type FC } from "react";
import Toast from "react-native-toast-message";
import { createList } from "utilities/createList";
import type { RestaurantLocation } from "./useRestaurantLocations";
import { useRestaurantLocations } from "./useRestaurantLocations";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  restaurantName: string;
  city: string;
  onSucces?: (restaurant?: RestaurantLocation) => void;
}

const RestaurantsLocationsModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  restaurantName,
  city,
  onSucces,
}) => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const { data, loading, error } = useRestaurantLocations(restaurantName, city);
  const selectedRestaurant = data?.find(
    restaurant => restaurant.id === selectedRestaurantId
  );

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong try again later",
      });
      setIsOpen(false);
    }
  }, [error]);

  const renderRestaurantLocation = (location: string) =>
    location ? (
      <Typography isMarginless type="S" weigth="bold">
        {location}
      </Typography>
    ) : null;

  const renderName = (name: string) => {
    const [restaurantName, restaurantLocation] = name.split("-");
    return (
      <>
        <Typography isMarginless type="S" weigth="bold">
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
        <Typography isMarginless type="S">
          {addressLine}
        </Typography>
        <Typography isMarginless type="S">
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

  const renderSkeletons = () =>
    createList(3).map(num => (
      <RadioField key={num} value={String(num)}>
        <Box>
          <Columns direction="column">
            <Column columnWidth="fullWidth">
              <Skeleton size="large" width="full" />
              <Skeleton size="medium" width="full" />
            </Column>
            <Column columnWidth="fullWidth">
              <Skeleton size="large" width="full" />
              <Skeleton size="medium" width="full" />
            </Column>
          </Columns>
        </Box>
      </RadioField>
    ));

  const renderContent = () => (loading ? renderSkeletons() : renderLocations());

  const handleOnPressCTA = () => {
    if (selectedRestaurant) {
      onSucces?.(selectedRestaurant);
      setIsOpen(false);
    } else {
      Toast.show({
        type: "error",
        text1: "You need to select your restaurant",
      });
    }
  };

  return (
    <Modal
      isModalVisible={isOpen}
      setModalVisible={setIsOpen}
      onPressToActionLabel="Sign Up"
      onPressToAction={handleOnPressCTA}>
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
            selectedValue={selectedRestaurantId}
            onValueChange={id => setSelectedRestaurantId(id)}>
            {renderContent()}
          </RadioGroup>
        </Column>
      </Columns>
    </Modal>
  );
};

export { RestaurantsLocationsModal };
