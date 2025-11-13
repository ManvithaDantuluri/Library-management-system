import { mockCategories } from "../mock/mockData";

export const getCategories = async () => {
  return mockCategories;
};

export const createCategory = async (category) => {
  const newCategory = { id: Date.now(), ...category };
  mockCategories.push(newCategory);
  return newCategory;
};

export const updateCategory = async (id, updatedCategory) => {
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index !== -1)
    mockCategories[index] = { ...mockCategories[index], ...updatedCategory };
  return mockCategories[index];
};

export const deleteCategory = async (id) => {
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index !== -1) mockCategories.splice(index, 1);
  return { success: true };
};
