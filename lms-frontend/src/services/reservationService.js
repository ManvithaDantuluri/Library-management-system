import { mockReservations } from "../mock/mockData";

// ✅ Get all reservations
export const getReservations = async () => {
  return mockReservations;
};

// ✅ Create a new reservation
export const createReservation = async (reservation) => {
  const newReservation = {
    id: Date.now(),
    ...reservation,
    date: new Date().toISOString().split("T")[0],
    status: "Reserved",
  };
  mockReservations.push(newReservation);
  return newReservation;
};

// ✅ Update reservation (🔥 fixes your current error)
export const updateReservation = async (id, updatedData) => {
  const index = mockReservations.findIndex((r) => r.id === id);
  if (index !== -1) {
    mockReservations[index] = {
      ...mockReservations[index],
      ...updatedData,
    };
    return mockReservations[index];
  }
  return { success: false, message: "Reservation not found" };
};

// ✅ Cancel reservation
export const cancelReservation = async (id) => {
  const index = mockReservations.findIndex((r) => r.id === id);
  if (index !== -1) {
    mockReservations[index].status = "Cancelled";
    return { success: true };
  }
  return { success: false, message: "Reservation not found" };
};

// ✅ Delete reservation
export const deleteReservation = async (id) => {
  const index = mockReservations.findIndex((r) => r.id === id);
  if (index !== -1) {
    mockReservations.splice(index, 1);
    return { success: true };
  }
  return { success: false, message: "Reservation not found" };
};
