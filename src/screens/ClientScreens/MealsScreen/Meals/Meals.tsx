import type { FC } from "react";
import { useCallback } from "react";
import { User } from "schema";
import { createList } from "utilities/createList";
import { MealCard, SkeletonMealCard } from "./MealCard";
import type { MealsData } from "./useGetMealsQuery";
import { useGetMealsQuery } from "./useGetMealsQuery";

interface Props {
  userID: User["id"];
}

const Meals: FC<Props> = ({ userID }) => {
  const { data, loading } = useGetMealsQuery();

  const renderMeal = ({ id, ...meal }: MealsData) => (
    <MealCard userID={userID} key={id} meal={{ ...meal, id }} />
  );

  const renderMeals = useCallback(
    () => data?.meals.filter(({ active }) => active).map(renderMeal),
    [data?.meals],
  );

  const renderSkeleton = (index: number) => <SkeletonMealCard key={index} />;

  const renderSkeletons = useCallback(
    () => createList(3).map(renderSkeleton),
    [],
  );

  const renderContent = () => (loading ? renderSkeletons() : renderMeals());

  return <>{renderContent()}</>;
};

export { Meals };
