import { getApperClient } from "@/services/apperClient";

const transformUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    email: user.email_c,
    firstName: user.first_name_c,
    lastName: user.last_name_c,
    phone: user.phone_c,
    createdAt: user.CreatedOn
  };
};

const userService = {
  getProfile: async (userId) => {
    try {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('user_c', parseInt(userId), {
        fields: [
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("User not found");
      }

      return transformUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  updateProfile: async (userId, profileData) => {
    try {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const apperClient = getApperClient();
      const updateData = {};
      
      if (profileData.firstName !== undefined) updateData.first_name_c = profileData.firstName;
      if (profileData.lastName !== undefined) updateData.last_name_c = profileData.lastName;
      if (profileData.phone !== undefined) updateData.phone_c = profileData.phone;

      const response = await apperClient.updateRecord('user_c', {
        records: [{
          Id: parseInt(userId),
          ...updateData
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update profile:`, failed);
          throw new Error(failed[0].message || "Failed to update profile");
        }
        
        const updated = response.results.find(r => r.success);
        return transformUser(updated.data);
      }

      return transformUser(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }
};

export default userService;