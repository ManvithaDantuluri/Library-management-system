import { mockUsers } from "../mock/mockData";

// ✅ Get all users
export const getAllUsers = async () => {
  return mockUsers;
};

// ✅ Add a new user
export const addUser = async (user) => {
  const newUser = { id: Date.now(), ...user };
  mockUsers.push(newUser);
  return newUser;
};

// ✅ Update a user
export const updateUser = async (id, updatedData) => {
  const index = mockUsers.findIndex((u) => u.id === id);
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...updatedData };
    return mockUsers[index];
  }
  return { success: false, message: "User not found" };
};

// ✅ Delete a user
export const deleteUser = async (id) => {
  const index = mockUsers.findIndex((u) => u.id === id);
  if (index !== -1) {
    mockUsers.splice(index, 1);
    return { success: true };
  }
  return { success: false, message: "User not found" };
};

// ✅ Get user by ID
export const getUserById = async (id) => {
  return mockUsers.find((u) => u.id === id) || null;
};

// ✅ Get current user's profile (mock)
export const getMyProfile = async (userId = 1) => {
  const user = mockUsers.find((u) => u.id === userId);
  return (
    user || {
      id: userId,
      name: "Guest User",
      email: "guest@example.com",
      role: "Reader",
    }
  );
};

// ✅ 🔥 NEW: Update current user's profile
export const updateProfile = async (userId = 1, updatedProfile) => {
  const index = mockUsers.findIndex((u) => u.id === userId);
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...updatedProfile };
    return mockUsers[index];
  }
  return { success: false, message: "User not found" };
};
