import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Box,
  Button,
  Chip,
  Column,
  Columns,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { Clock10Icon } from "lucide-react-native";
import React, { type FC } from "react";
import Toast from "react-native-toast-message";
import type { Meal, Restaurant } from "schema";
import { useActivateMealMutation } from "shared/useActivateMealMutation";
import {
  formatStringToReadableTime,
  getDateInReadableFormat,
} from "utilities/time";

interface MealSplinter
  extends Pick<
    Meal,
    | "active"
    | "id"
    | "name"
    | "quantityAvailable"
    | "pickupStartTime"
    | "pickupEndTime"
  > {
  totalQuantityOrdered?: number;
  totalRevenue?: string;
}

interface Props {
  meal: Partial<MealSplinter>;
  onPressNavigateToOrders: () => void;
  restaurantID: Restaurant["id"];
  activeMealId: string | undefined;
}

const RestaurantDashboardMealCard: FC<Props> = ({
  activeMealId,
  meal,
  onPressNavigateToOrders,
}) => {
  const {
    active,
    name,
    quantityAvailable,
    totalQuantityOrdered,
    totalRevenue,
    pickupEndTime,
    pickupStartTime,
    id,
  } = meal ?? {};

  const [toggleActiveStateMeal, { loading }] = useActivateMealMutation();

  const onPressToggleActiveStateMeal = () => {
    if (activeMealId && !active) {
      Toast.show({
        type: "error",
        text1: "You can only have 1 active meal",
      });
    } else {
      toggleActiveStateMeal({
        variables: {
          input: {
            mealId: id!,
            active: !active,
          },
        },
      });
    }
  };

  return (
    <Box isPaddingLess>
      <Chip type={active ? "success" : "warning"} className="top-0 left-0">
        {active ? "Active" : "Disabled"}
      </Chip>
      <Accordion>
        <AccordionHeader>
          <Typography className="mt-12" colour="accent" weigth="bold">
            {name}
          </Typography>

          <Columns isMarginless>
            <Column>
              <Typography type="S" weigth="bold">
                Remaining: <Typography type="S">{quantityAvailable}</Typography>
              </Typography>
            </Column>
            <Column>
              <Typography type="S" weigth="bold">
                Revenue: <Typography type="S"> {totalRevenue}</Typography>
              </Typography>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Column>
                <Typography type="S" weigth="bold">
                  Reserved:{" "}
                  <Typography colour="accent" type="S">
                    {" "}
                    {totalQuantityOrdered}
                  </Typography>
                </Typography>
              </Column>
            </Column>
          </Columns>
        </AccordionHeader>
        <AccordionContent>
          <Columns direction="column">
            <Column columnWidth="fullWidth">
              <Typography type="S" isMarginless weigth="bold">
                Pickup {getDateInReadableFormat(pickupStartTime!)} Between
              </Typography>
            </Column>
            <Column columnWidth="fullWidth" direction="row">
              <Clock10Icon color={COLOURS.accent} className="mr-2" />
              <Typography isMarginless type="S">
                {formatStringToReadableTime(pickupStartTime!)} and{" "}
                {formatStringToReadableTime(pickupEndTime!)}
              </Typography>
            </Column>
          </Columns>
          <Columns isMarginless>
            <Column>
              <Button
                onPress={onPressToggleActiveStateMeal}
                isLoading={loading}
                theme="accent">
                {active ? "Deactivate" : "Activate"}
              </Button>
            </Column>
            <Column>
              <Button onPress={onPressNavigateToOrders}>View orders</Button>
            </Column>
          </Columns>
        </AccordionContent>
      </Accordion>
    </Box>
  );
};

export { RestaurantDashboardMealCard };
