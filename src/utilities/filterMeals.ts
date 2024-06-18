import type { MealsQueryData } from "screens/ClientScreens/MealsScreen/useGetMealsQuery";

export const filterMeals = (meals?: MealsQueryData["meals"]) => {
  const currentTime = new Date();
  return __DEV__
    ? meals?.filter(({ active }) => active)
    : meals?.filter(
        ({
          active,
          restaurant: { stripeOnboardingComplete },
          orderCutoffTime,
        }) =>
          active &&
          stripeOnboardingComplete &&
          new Date(orderCutoffTime) > currentTime
      );
};
