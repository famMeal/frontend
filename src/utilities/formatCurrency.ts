const formatCurrency = (
  amount?: number | null,
  options?: Intl.NumberFormatOptions
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
    ...options,
  });
  if (amount) return formatter.format(amount);
};

export { formatCurrency };
