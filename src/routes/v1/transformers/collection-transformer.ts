export const transformCollectionItems = (items: any[]) => {
  return items.map((item: any) => ({
    ...item.json_data,
  }));
};
