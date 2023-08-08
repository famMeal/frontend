/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Meal = {
  __typename?: 'Meal';
  active?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  orderCutoffTime?: Maybe<Scalars['String']['output']>;
  orderStartTime?: Maybe<Scalars['String']['output']>;
  pickupEndTime?: Maybe<Scalars['String']['output']>;
  pickupStartTime?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantityAvailable?: Maybe<Scalars['Int']['output']>;
  restaurant?: Maybe<Restaurant>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** An example field added by the generator */
  testField: Scalars['String']['output'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID']['output'];
  meal?: Maybe<Meal>;
  pickupEndTime?: Maybe<Scalars['String']['output']>;
  pickupStartTime?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  restaurant?: Maybe<Restaurant>;
  status?: Maybe<Scalars['String']['output']>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  tipAmount?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  meal?: Maybe<Meal>;
  meals: Array<Meal>;
  order?: Maybe<Order>;
  restaurant?: Maybe<Restaurant>;
  restaurants: Array<Restaurant>;
  user?: Maybe<User>;
};


export type QueryMealArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRestaurantArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  meals: Array<Meal>;
  name: Scalars['String']['output'];
  orders: Array<Order>;
  postalCode?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  restaurantSetting?: Maybe<RestaurantSetting>;
  users: Array<User>;
};

export type RestaurantSetting = {
  __typename?: 'RestaurantSetting';
  byobTupperware?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  orderCutoffTime?: Maybe<Scalars['String']['output']>;
  orderStartTime?: Maybe<Scalars['String']['output']>;
  pickupEndTime?: Maybe<Scalars['String']['output']>;
  pickupStartTime?: Maybe<Scalars['String']['output']>;
  quantityAvailable?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isStoreOwner?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  restaurant?: Maybe<Restaurant>;
};
