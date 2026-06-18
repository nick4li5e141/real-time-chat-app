
// all account management is done client-side for this demo, so we can store accounts in localStorage

const STORAGE_KEY = "chat-app-member-accounts";

const defaultAccounts = [
  {
    id: "demo-user",
    name: "demo",
    email: "demo@example.com",
    password: "123456",
    joinedRooms: ["General", "Design"]
  },
];

export function loadAccounts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAccounts));
      return [...defaultAccounts];
    }

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultAccounts];
  } catch (error) {
    console.error("Failed to load member accounts:", error);
    return [...defaultAccounts];
  }
}

export function saveAccounts(accounts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function createAccount({ name, email, password }) {
  const accounts = loadAccounts();
  const trimmedName = name.trim().toLowerCase();
  const trimmedEmail = email.trim().toLowerCase();

  const alreadyExists = accounts.some(
    (account) =>
      account.name.toLowerCase() === trimmedName || account.email.toLowerCase() === trimmedEmail
  );

  if (alreadyExists) {
    return { success: false, message: "That member name or email already exists." };
  }

  const newAccount = {
    id: crypto.randomUUID ? crypto.randomUUID() : `member-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    password,
    joinedRooms: ["General", "Design"]
  };

  accounts.push(newAccount);
  saveAccounts(accounts);

  return { success: true, account: newAccount };
}

export function validateAccount(name, password) {
  const accounts = loadAccounts();
  return accounts.find(
    (account) =>
      account.name.toLowerCase() === name.trim().toLowerCase() &&
      account.password === password
  ) || null;
}
