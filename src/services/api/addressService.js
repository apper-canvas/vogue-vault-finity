import addressesData from "../mockData/addresses.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ADDRESS_STORAGE_KEY = "vogue_vault_addresses";

const getStoredAddresses = () => {
  try {
    const stored = localStorage.getItem(ADDRESS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [...addressesData];
  } catch (error) {
    console.error("Error reading addresses from localStorage:", error);
    return [...addressesData];
  }
};

const saveAddresses = (addresses) => {
  try {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
  } catch (error) {
    console.error("Error saving addresses to localStorage:", error);
  }
};

const addressService = {
  getAll: async (userId) => {
    await delay(200);
    const addresses = getStoredAddresses();
    return addresses.filter(addr => addr.userId === userId);
  },

  getById: async (id, userId) => {
    await delay(200);
    const addresses = getStoredAddresses();
    const address = addresses.find(addr => addr.Id === parseInt(id) && addr.userId === userId);
    if (!address) {
      throw new Error("Address not found");
    }
    return { ...address };
  },

  create: async (addressData, userId) => {
    await delay(300);
    const addresses = getStoredAddresses();
    const userAddresses = addresses.filter(addr => addr.userId === userId);
    
    const newAddress = {
      Id: Date.now(),
      userId: userId,
      ...addressData,
      isDefault: userAddresses.length === 0
    };
    
    addresses.push(newAddress);
    saveAddresses(addresses);
    
    return newAddress;
  },

  update: async (id, addressData, userId) => {
    await delay(300);
    const addresses = getStoredAddresses();
    const index = addresses.findIndex(addr => addr.Id === parseInt(id) && addr.userId === userId);
    
    if (index === -1) {
      throw new Error("Address not found");
    }
    
    addresses[index] = {
      ...addresses[index],
      ...addressData,
      Id: addresses[index].Id,
      userId: addresses[index].userId
    };
    
    saveAddresses(addresses);
    return { ...addresses[index] };
  },

  delete: async (id, userId) => {
    await delay(200);
    const addresses = getStoredAddresses();
    const index = addresses.findIndex(addr => addr.Id === parseInt(id) && addr.userId === userId);
    
    if (index === -1) {
      throw new Error("Address not found");
    }
    
    const updatedAddresses = addresses.filter(addr => addr.Id !== parseInt(id));
    saveAddresses(updatedAddresses);
    
    return true;
  }
};

export default addressService;