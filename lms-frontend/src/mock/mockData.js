export const mockBooks = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", available: true },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic", available: false },
];

export const mockCategories = [
  { id: 1, name: "Fiction" },
  { id: 2, name: "Science" },
  { id: 3, name: "History" },
];

export const mockUsers = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

export const mockReservations = [
  {
    id: 1,
    user: "Alice",
    book: "The Great Gatsby",
    date: "2025-10-28",
    status: "Active",
  },
  {
    id: 2,
    user: "Bob",
    book: "To Kill a Mockingbird",
    date: "2025-10-25",
    status: "Returned",
  },
];
export const mockBorrowRecords = [
  {
    id: 1,
    user: "Alice",
    book: "The Great Gatsby",
    date: "2025-10-28",
    status: "Borrowed",
  },
  {
    id: 2,
    user: "Bob",
    book: "To Kill a Mockingbird",
    date: "2025-10-25",
    status: "Returned",
  },
];

export const mockReviews = [
  {
    id: 1,
    book: "The Great Gatsby",
    user: "Alice",
    rating: 5,
    comment: "A classic masterpiece.",
    date: "2025-10-28",
  },
  {
    id: 2,
    book: "To Kill a Mockingbird",
    user: "Bob",
    rating: 4,
    comment: "Very thought-provoking and emotional.",
    date: "2025-10-25",
  },
];

