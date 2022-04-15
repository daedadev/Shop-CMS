export function getCompletedOrderCount(items, setCompletedCount) {
  let completedObject = {
    completed: 0,
    incompleted: 0,
  };

  items.forEach((order) => {
    if (order.order_status === true) {
      completedObject.completed += 1;
    } else {
      completedObject.incompleted += 1;
    }
  });

  setCompletedCount(completedObject);
}
