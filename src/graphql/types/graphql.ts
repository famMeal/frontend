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

/** Autogenerated input type of AddTip */
export type AddTipInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['ID']['input'];
  tipAmount?: InputMaybe<Scalars['Float']['input']>;
  tipPercentage?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated return type of AddTip. */
export type AddTipPayload = {
  __typename?: 'AddTipPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  order?: Maybe<Order>;
};

/** Autogenerated input type of AddToCart */
export type AddToCartInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  mealId: Scalars['ID']['input'];
  pickupEndTime: Scalars['String']['input'];
  pickupStartTime: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};

/** Autogenerated return type of AddToCart. */
export type AddToCartPayload = {
  __typename?: 'AddToCartPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  order?: Maybe<Order>;
};

/** Autogenerated input type of Create */
export type CreateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  restaurantId: Scalars['ID']['input'];
};

/** Autogenerated return type of Create. */
export type CreatePayload = {
  __typename?: 'CreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  meal?: Maybe<Meal>;
};

export type Credential = {
  __typename?: 'Credential';
  accessToken: Scalars['String']['output'];
  client: Scalars['String']['output'];
  expiry: Scalars['Int']['output'];
  tokenType: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

/** Autogenerated input type of Delete */
export type DeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  mealId: Scalars['ID']['input'];
};

/** Autogenerated return type of Delete. */
export type DeletePayload = {
  __typename?: 'DeletePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  meal?: Maybe<Meal>;
};

export type Meal = {
  __typename?: 'Meal';
  active: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  orderCutoffTime: Scalars['String']['output'];
  orderStartTime: Scalars['String']['output'];
  pickupEndTime: Scalars['String']['output'];
  pickupStartTime: Scalars['String']['output'];
  price: Scalars['String']['output'];
  quantityAvailable: Scalars['Int']['output'];
  restaurant?: Maybe<Restaurant>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTip?: Maybe<AddTipPayload>;
  addToCart?: Maybe<AddToCartPayload>;
  mealCreate?: Maybe<CreatePayload>;
  mealDelete?: Maybe<DeletePayload>;
  mealUpdate?: Maybe<UpdatePayload>;
  placeOrder?: Maybe<PlaceOrderPayload>;
  signUp?: Maybe<SignUpPayload>;
  updateAllOrdersStatus?: Maybe<UpdateAllOrdersStatusPayload>;
  updateOrder?: Maybe<UpdateOrderPayload>;
  updateRestaurantSetting?: Maybe<UpdateSettingPayload>;
  userConfirmRegistrationWithToken?: Maybe<UserConfirmRegistrationWithTokenPayload>;
  userLogin?: Maybe<UserLoginPayload>;
  userLogout?: Maybe<UserLogoutPayload>;
  userRegister?: Maybe<UserRegisterPayload>;
  userResendConfirmationWithToken?: Maybe<UserResendConfirmationWithTokenPayload>;
  userSendPasswordResetWithToken?: Maybe<UserSendPasswordResetWithTokenPayload>;
  userUpdatePasswordWithToken?: Maybe<UserUpdatePasswordWithTokenPayload>;
  verifyAccount?: Maybe<VerifyAccountPayload>;
};


export type MutationAddTipArgs = {
  input: AddTipInput;
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
};


export type MutationMealCreateArgs = {
  input: CreateInput;
};


export type MutationMealDeleteArgs = {
  input: DeleteInput;
};


export type MutationMealUpdateArgs = {
  input: UpdateInput;
};


export type MutationPlaceOrderArgs = {
  input: PlaceOrderInput;
};


export type MutationSignUpArgs = {
  confirmUrl?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  restaurantName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateAllOrdersStatusArgs = {
  input: UpdateAllOrdersStatusInput;
};


export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
};


export type MutationUpdateRestaurantSettingArgs = {
  input: UpdateSettingInput;
};


export type MutationUserConfirmRegistrationWithTokenArgs = {
  confirmationToken: Scalars['String']['input'];
};


export type MutationUserLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUserRegisterArgs = {
  confirmUrl?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUserResendConfirmationWithTokenArgs = {
  confirmUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationUserSendPasswordResetWithTokenArgs = {
  email: Scalars['String']['input'];
  redirectUrl: Scalars['String']['input'];
};


export type MutationUserUpdatePasswordWithTokenArgs = {
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  resetPasswordToken: Scalars['String']['input'];
};


export type MutationVerifyAccountArgs = {
  confirmationToken: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  meal?: Maybe<Meal>;
  pickupEndTime?: Maybe<Scalars['String']['output']>;
  pickupStartTime?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  restaurant?: Maybe<Restaurant>;
  status?: Maybe<Scalars['String']['output']>;
  subtotal?: Maybe<Scalars['String']['output']>;
  taxes?: Maybe<Scalars['String']['output']>;
  tipAmount?: Maybe<Scalars['String']['output']>;
  tipPercentage?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

/** Autogenerated input type of PlaceOrder */
export type PlaceOrderInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['ID']['input'];
  pickupEndTime?: InputMaybe<Scalars['String']['input']>;
  pickupStartTime?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated return type of PlaceOrder. */
export type PlaceOrderPayload = {
  __typename?: 'PlaceOrderPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  order?: Maybe<Order>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
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
  id: Scalars['ID']['output'];
  orderCutoffTime?: Maybe<Scalars['String']['output']>;
  orderStartTime?: Maybe<Scalars['String']['output']>;
  pickupEndTime?: Maybe<Scalars['String']['output']>;
  pickupStartTime?: Maybe<Scalars['String']['output']>;
  quantityAvailable?: Maybe<Scalars['Int']['output']>;
};

/** Autogenerated return type of SignUp. */
export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  authenticatable?: Maybe<User>;
  /**
   * Authentication credentials. Null if after signUp resource is not active for
   * authentication (e.g. Email confirmation required).
   */
  credentials?: Maybe<Credential>;
};

/** Autogenerated input type of UpdateAllOrdersStatus */
export type UpdateAllOrdersStatusInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  fromStatus: Scalars['String']['input'];
  restaurantId: Scalars['ID']['input'];
  toStatus: Scalars['String']['input'];
};

/** Autogenerated return type of UpdateAllOrdersStatus. */
export type UpdateAllOrdersStatusPayload = {
  __typename?: 'UpdateAllOrdersStatusPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  orders?: Maybe<Array<Order>>;
};

/** Autogenerated input type of Update */
export type UpdateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  mealId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

/** Autogenerated input type of UpdateOrder */
export type UpdateOrderInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  orderId: Scalars['ID']['input'];
  pickupEndTime?: InputMaybe<Scalars['String']['input']>;
  pickupStartTime?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of UpdateOrder. */
export type UpdateOrderPayload = {
  __typename?: 'UpdateOrderPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  order?: Maybe<Order>;
};

/** Autogenerated return type of Update. */
export type UpdatePayload = {
  __typename?: 'UpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  meal?: Maybe<Meal>;
};

/** Autogenerated input type of UpdateSetting */
export type UpdateSettingInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  orderCutoffTime?: InputMaybe<Scalars['String']['input']>;
  orderStartTime?: InputMaybe<Scalars['String']['input']>;
  pickupEndTime?: InputMaybe<Scalars['String']['input']>;
  pickupStartTime?: InputMaybe<Scalars['String']['input']>;
  quantityAvailable?: InputMaybe<Scalars['Int']['input']>;
  restaurantId: Scalars['ID']['input'];
};

/** Autogenerated return type of UpdateSetting. */
export type UpdateSettingPayload = {
  __typename?: 'UpdateSettingPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  restaurantSetting?: Maybe<RestaurantSetting>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isStoreOwner?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  orders: Array<Order>;
  restaurant?: Maybe<Restaurant>;
};

/** Autogenerated return type of UserConfirmRegistrationWithToken. */
export type UserConfirmRegistrationWithTokenPayload = {
  __typename?: 'UserConfirmRegistrationWithTokenPayload';
  authenticatable: User;
  /** Authentication credentials. Null unless user is signed in after confirmation. */
  credentials?: Maybe<Credential>;
};

/** Autogenerated return type of UserLogin. */
export type UserLoginPayload = {
  __typename?: 'UserLoginPayload';
  authenticatable: User;
  credentials: Credential;
};

/** Autogenerated return type of UserLogout. */
export type UserLogoutPayload = {
  __typename?: 'UserLogoutPayload';
  authenticatable: User;
};

/** Autogenerated return type of UserRegister. */
export type UserRegisterPayload = {
  __typename?: 'UserRegisterPayload';
  authenticatable: User;
  /**
   * Authentication credentials. Null if after signUp resource is not active for
   * authentication (e.g. Email confirmation required).
   */
  credentials?: Maybe<Credential>;
};

/** Autogenerated return type of UserResendConfirmationWithToken. */
export type UserResendConfirmationWithTokenPayload = {
  __typename?: 'UserResendConfirmationWithTokenPayload';
  message: Scalars['String']['output'];
};

/** Autogenerated return type of UserSendPasswordResetWithToken. */
export type UserSendPasswordResetWithTokenPayload = {
  __typename?: 'UserSendPasswordResetWithTokenPayload';
  message: Scalars['String']['output'];
};

/** Autogenerated return type of UserUpdatePasswordWithToken. */
export type UserUpdatePasswordWithTokenPayload = {
  __typename?: 'UserUpdatePasswordWithTokenPayload';
  authenticatable: User;
  /** Authentication credentials. Resource must be signed_in for credentials to be returned. */
  credentials?: Maybe<Credential>;
};

/** Autogenerated return type of VerifyAccount. */
export type VerifyAccountPayload = {
  __typename?: 'VerifyAccountPayload';
  authenticatable?: Maybe<User>;
  /** Authentication credentials. Null unless user is signed in after confirmation. */
  credentials?: Maybe<Credential>;
};
