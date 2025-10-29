import productsData from "../mockData/products.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const productService = {
  getAll: async () => {
    await delay(300);
    return [...productsData];
  },

  getById: async (id) => {
    await delay(200);
    const product = productsData.find((p) => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  getByCategory: async (category) => {
    await delay(300);
    return productsData.filter((p) => p.category === category);
  },

  getFeatured: async () => {
    await delay(300);
    return productsData.filter((p) => p.featured);
  },

  getTrending: async () => {
    await delay(300);
    return productsData.filter((p) => p.trending);
  },

  search: async (query) => {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
p.description.toLowerCase().includes(lowerQuery)
    );
  },

  getUniqueFilterValues: async () => {
    await delay(200);
    const brands = [...new Set(productsData.map(p => p.brand))].sort();
    const styles = [...new Set(productsData.map(p => p.style))].sort();
    const occasions = [...new Set(productsData.map(p => p.occasion))].sort();
    const materials = [...new Set(productsData.map(p => p.material))].sort();
    const sizes = [...new Set(productsData.flatMap(p => p.sizes))].sort((a, b) => {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const aIndex = sizeOrder.indexOf(a);
      const bIndex = sizeOrder.indexOf(b);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.localeCompare(b, undefined, { numeric: true });
    });
    const colors = [...new Set(productsData.flatMap(p => p.colors))].sort();
    
    return {
      brands: brands.map(b => ({ label: b, value: b })),
      styles: styles.map(s => ({ label: s, value: s })),
      occasions: occasions.map(o => ({ label: o, value: o })),
      materials: materials.map(m => ({ label: m, value: m })),
      sizes: sizes.map(s => ({ label: s, value: s })),
      colors: colors.map(c => ({ label: c, value: c }))
    };
  }
};

export default productService;