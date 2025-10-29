import { getApperClient } from "@/services/apperClient";

const parseItems = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

const parseShippingAddress = (value) => {
  if (!value) return {};
  if (typeof value === 'object' && !Array.isArray(value)) return value;
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

const transformOrder = (order) => {
  if (!order) return null;
  return {
    ...order,
    userId: order.user_id_c?.Id || order.user_id_c,
    orderNumber: order.order_number_c,
    items: parseItems(order.items_c),
    subtotal: order.subtotal_c,
    shipping: order.shipping_c,
    tax: order.tax_c,
    total: order.total_c,
    shippingAddress: parseShippingAddress(order.shipping_address_c),
    status: order.status_c,
    createdAt: order.CreatedOn
  };
};

const orderService = {
  createOrder: async (orderData, userId) => {
    try {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const apperClient = getApperClient();
      const response = await apperClient.createRecord('order_c', {
        records: [{
          user_id_c: parseInt(userId),
          order_number_c: `VO${Date.now().toString().slice(-8)}`,
          items_c: JSON.stringify(orderData.items),
          subtotal_c: orderData.subtotal,
          shipping_c: orderData.shipping,
          tax_c: orderData.tax,
          total_c: orderData.total,
          shipping_address_c: JSON.stringify(orderData.shippingAddress),
          status_c: "Processing"
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create order:`, failed);
          throw new Error(failed[0].message || "Failed to create order");
        }
        
        const created = response.results.find(r => r.success);
        return transformOrder(created.data);
      }

      return transformOrder(response.data);
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  getUserOrders: async (userId) => {
    try {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('order_c', {
        fields: [
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "order_number_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "subtotal_c"}},
          {"field": {"Name": "shipping_c"}},
          {"field": {"Name": "tax_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{
          FieldName: "user_id_c",
          Operator: "EqualTo",
          Values: [parseInt(userId)]
        }],
        orderBy: [{
          fieldName: "CreatedOn",
          sorttype: "DESC"
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return (response.data || []).map(transformOrder);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  },

  getOrderById: async (orderId, userId) => {
    try {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('order_c', parseInt(orderId), {
        fields: [
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "order_number_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "subtotal_c"}},
          {"field": {"Name": "shipping_c"}},
          {"field": {"Name": "tax_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Order not found");
      }

      const order = transformOrder(response.data);
      
      if (order.userId !== parseInt(userId)) {
        throw new Error("Order not found");
      }

      return order;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  }
};

export default orderService;