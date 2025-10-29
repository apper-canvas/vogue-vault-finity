import { getApperClient } from "@/services/apperClient";

const parseMultiPicklist = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(',').map(v => v.trim()).filter(Boolean);
};
const parseImages = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [value];
  }
};

const transformProduct = (product) => {
  if (!product) return null;
  return {
    ...product,
    name: product.name_c,
    category: product.category_c,
    subcategory: product.subcategory_c,
    price: product.price_c,
    images: parseImages(product.images_c),
    sizes: parseMultiPicklist(product.sizes_c),
    colors: parseMultiPicklist(product.colors_c),
    brand: product.brand_c,
    style: product.style_c,
    occasion: product.occasion_c,
    material: product.material_c,
    description: product.description_c,
    inStock: product.in_stock_c,
    stockCount: product.stock_count_c,
    featured: product.featured_c,
    trending: product.trending_c
  };
};

const productService = {
getAll: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "style_c"}},
          {"field": {"Name": "occasion_c"}},
          {"field": {"Name": "material_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return (response.data || []).map(transformProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

getById: async (id) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return null;
      }
      const response = await apperClient.getRecordById('product_c', parseInt(id), {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "style_c"}},
          {"field": {"Name": "occasion_c"}},
          {"field": {"Name": "material_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Product not found");
      }

      return transformProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

getByCategory: async (category) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "style_c"}},
          {"field": {"Name": "occasion_c"}},
          {"field": {"Name": "material_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ],
        where: [{
          FieldName: "category_c",
          Operator: "EqualTo",
          Values: [category]
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return (response.data || []).map(transformProduct);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

getFeatured: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "style_c"}},
          {"field": {"Name": "occasion_c"}},
          {"field": {"Name": "material_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ],
        where: [{
          FieldName: "featured_c",
          Operator: "EqualTo",
          Values: [true]
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return (response.data || []).map(transformProduct);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw error;
    }
  },

getTrending: async () => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "style_c"}},
          {"field": {"Name": "occasion_c"}},
          {"field": {"Name": "material_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ],
        where: [{
          FieldName: "trending_c",
          Operator: "EqualTo",
          Values: [true]
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return (response.data || []).map(transformProduct);
    } catch (error) {
      console.error("Error fetching trending products:", error);
      throw error;
    }
  },


search: async (query) => {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "style_c"}},
          {"field": {"Name": "occasion_c"}},
          {"field": {"Name": "material_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "stock_count_c"}},
          {"field": {"Name": "featured_c"}},
          {"field": {"Name": "trending_c"}}
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [
            {
              conditions: [{
                fieldName: "name_c",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "category_c",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "description_c",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            }
          ]
        }]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return (response.data || []).map(transformProduct);
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },



getFilters: async () => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "style_c"}},
          {"field": {"Name": "occasion_c"}},
          {"field": {"Name": "material_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      const products = response.data || [];
      
      const brands = [...new Set(products.map(p => p.brand_c).filter(Boolean))].sort();
      const styles = [...new Set(products.map(p => p.style_c).filter(Boolean))].sort();
      const occasions = [...new Set(products.map(p => p.occasion_c).filter(Boolean))].sort();
      const materials = [...new Set(products.map(p => p.material_c).filter(Boolean))].sort();
      
      const allSizes = [...new Set(products.flatMap(p => parseMultiPicklist(p.sizes_c)))];
      const sizes = allSizes.sort((a, b) => {
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        const aIndex = sizeOrder.indexOf(a);
        const bIndex = sizeOrder.indexOf(b);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.localeCompare(b, undefined, { numeric: true });
      });
      
      const colors = [...new Set(products.flatMap(p => parseMultiPicklist(p.colors_c)))].sort();

      return {
        brands: brands.map(b => ({ label: b, value: b })),
        styles: styles.map(s => ({ label: s, value: s })),
        occasions: occasions.map(o => ({ label: o, value: o })),
        materials: materials.map(m => ({ label: m, value: m })),
        sizes: sizes.map(s => ({ label: s, value: s })),
        colors: colors.map(c => ({ label: c, value: c }))
      };
    } catch (error) {
      console.error("Error fetching filter values:", error);
      return {
        brands: [],
        styles: [],
        occasions: [],
        materials: [],
        sizes: [],
        colors: []
      };
    }
  }

};

export default productService;