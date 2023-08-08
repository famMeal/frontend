import type { FC } from "react";
import type { MealsData } from "./useGetMealsQuery";
import { useGetMealsQuery } from "./useGetMealsQuery";
import { useCallback } from "react";
import { MealCard, SkeletonMealCard } from "./MealCard";
import { createList } from "utilities/createList";

const Meals: FC = () => {
  const { data, loading } = useGetMealsQuery();

  const renderMeal = ({ id, ...meal }: MealsData) => (
    <MealCard key={id} meal={{ ...meal, id }} />
  );

  const renderMeals = useCallback(
    () => data?.meals.map(renderMeal),
    [data?.meals]
  );

  const renderSkeleton = (index: number) => <SkeletonMealCard key={index} />;

  const renderSkeletons = useCallback(
    () => createList(3).map(renderSkeleton),
    [loading]
  );

  const renderContent = () => (loading ? renderSkeletons() : renderMeals());

  return <>{renderContent()}</>;
};

export { Meals };
