import { mockBooks } from "../mock/mockData";

export const getAllBooks = async () => {
  return mockBooks;
};

export const addBook = async (book) => {
  mockBooks.push({ id: Date.now(), ...book });
  return book;
};

export const updateBook = async (id, updatedBook) => {
  const index = mockBooks.findIndex((b) => b.id === id);
  if (index !== -1) mockBooks[index] = { ...mockBooks[index], ...updatedBook };
  return mockBooks[index];
};

export const deleteBook = async (id) => {
  const index = mockBooks.findIndex((b) => b.id === id);
  if (index !== -1) mockBooks.splice(index, 1);
  return { success: true };
};
