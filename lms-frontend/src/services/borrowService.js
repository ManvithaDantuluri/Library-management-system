import { mockBorrowRecords } from "../mock/mockData";

// Get all borrow records
export const getAllBorrowRecords = async () => {
  return mockBorrowRecords;
};

// Borrow a book (add new record)
export const borrowBook = async (record) => {
  const newRecord = {
    id: Date.now(),
    ...record,
    status: "Borrowed",
    date: new Date().toISOString().split("T")[0],
  };
  mockBorrowRecords.push(newRecord);
  return newRecord;
};

// Mark a book as returned
export const returnBook = async (id) => {
  const record = mockBorrowRecords.find((r) => r.id === id);
  if (record) record.status = "Returned";
  return record;
};

// Get borrow history of a particular user
export const getUserHistory = async (userName) => {
  return mockBorrowRecords.filter((r) => r.user === userName);
};
