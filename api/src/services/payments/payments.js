export const calculateOrderAmount = (clientAmount, serverAmount) => {
  if (clientAmount === serverAmount) {
    return serverAmount * 100
  } else {
    return null
  }
}
