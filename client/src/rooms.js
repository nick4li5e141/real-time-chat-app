const STORAGE_KEY = "chat-app-rooms";

const defaultRooms = ["General", "Design", "Support", "Project Updates"];

export function loadRooms() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRooms));
      return [...defaultRooms];
    }

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultRooms];
  } catch (error) {
    console.error("Failed to load rooms:", error);
    return [...defaultRooms];
  }
}

export function saveRooms(rooms) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
}

export function createRoom(roomName) {
  const trimmed = roomName.trim();
  if (!trimmed) return { success: false, message: "Room name is required." };

  const rooms = loadRooms();
  const alreadyExists = rooms.some((room) => room.toLowerCase() === trimmed.toLowerCase());

  if (alreadyExists) {
    return { success: false, message: "That room already exists." };
  }

  const updatedRooms = [...rooms, trimmed];
  saveRooms(updatedRooms);

  return { success: true, room: trimmed, rooms: updatedRooms };
}
