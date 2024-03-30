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
import { type FC } from "react";
import type { Meal, Restaurant } from "schema";
import { useActivateMealMutation } from "shared/useActivateMealMutation";
import { formatTime } from "utilities/formatTime";
import { returnDateInWeekday } from "utilities/returnDateInWeekday";

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
}

const RestaurantDashboardMealCard: FC<Props> = ({
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

  const onPressToggleActiveStateMeal = () =>
    toggleActiveStateMeal({
      variables: {
        input: {
          mealId: id!,
          active: !active,
        },
      },
    });

  return (
    <Box>
      <Chip type={active ? "success" : "primary"}>
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
                Available:{" "}
                <Typography colour="accent" type="S">
                  {" "}
                  {quantityAvailable}
                </Typography>
              </Typography>
            </Column>
            <Column>
              <Typography type="S" weigth="bold">
                Reserved:{" "}
                <Typography colour="accent" type="S">
                  {" "}
                  {totalQuantityOrdered}
                </Typography>
              </Typography>
            </Column>
          </Columns>
        </AccordionHeader>
        <AccordionContent>
          <Columns>
            <Column>
              <Typography type="S" weigth="bold">
                Remaining:{" "}
                <Typography type="S">
                  {" "}
                  {quantityAvailable! - totalQuantityOrdered!}
                </Typography>
              </Typography>
            </Column>
            <Column>
              <Typography type="S" weigth="bold">
                Revenue: <Typography type="S"> {totalRevenue}</Typography>
              </Typography>
            </Column>
          </Columns>
          <Columns direction="column">
            <Column columnWidth="fullWidth">
              <Typography type="S" isMarginless weigth="bold">
                Pickup {returnDateInWeekday(pickupStartTime!)} between:
              </Typography>
            </Column>
            <Column columnWidth="fullWidth" direction="row">
              <Clock10Icon color={COLOURS.accent} className="mr-2" />
              <Typography isMarginless type="S">
                {formatTime(pickupStartTime)} and {formatTime(pickupEndTime)}
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
