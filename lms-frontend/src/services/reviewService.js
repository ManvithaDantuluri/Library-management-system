import { mockReviews } from "../mock/mockData";

// ✅ Get all reviews
export const getAllReviews = async () => {
  return mockReviews;
};

// ✅ Get reviews for a specific book
export const getReviewsForBook = async (bookTitle) => {
  return mockReviews.filter((r) => r.book === bookTitle);
};

// ✅ Get reviews submitted by a specific user
export const getMyReviews = async (username) => {
  return mockReviews.filter((r) => r.user === username);
};

// ✅ Add a new review
export const addReview = async (review) => {
  const newReview = {
    id: Date.now(),
    ...review,
    date: new Date().toISOString().split("T")[0],
  };
  mockReviews.push(newReview);
  return newReview;
};

// ✅ Update an existing review (fix for your error)
export const updateReview = async (id, updatedData) => {
  const index = mockReviews.findIndex((r) => r.id === id);
  if (index !== -1) {
    mockReviews[index] = { ...mockReviews[index], ...updatedData };
    return mockReviews[index];
  }
  return null;
};

// ✅ Delete a review by ID
export const deleteReview = async (id) => {
  const index = mockReviews.findIndex((r) => r.id === id);
  if (index !== -1) mockReviews.splice(index, 1);
  return { success: true };
};
