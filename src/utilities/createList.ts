const createList = (n: number) => {
  return Array.from({ length: n }, (_, index) => index + 1);
};

export { createList };
