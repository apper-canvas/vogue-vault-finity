import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import productService from "@/services/api/productService";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import ProductGrid from "@/components/organisms/ProductGrid";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import FilterSection from "@/components/molecules/FilterSection";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
const [priceRange, setPriceRange] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [styles, setStyles] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [category]);

  useEffect(() => {
applyFilters();
  }, [products, priceRange, sizes, colors, brands, styles, occasions, materials, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getByCategory(category);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

const applyFilters = () => {
    let filtered = [...products];

    // Price filter
    if (priceRange.length > 0) {
      filtered = filtered.filter((product) => {
        return priceRange.some((range) => {
          switch (range) {
            case "under-100":
              return product.price < 100;
            case "100-200":
              return product.price >= 100 && product.price < 200;
            case "200-300":
              return product.price >= 200 && product.price < 300;
            case "over-300":
              return product.price >= 300;
            default:
              return true;
          }
        });
      });
    }

    // Size filter
    if (sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => sizes.includes(size))
      );
    }

    // Color filter
    if (colors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => colors.includes(color))
      );
    }

    // Brand filter
    if (brands.length > 0) {
      filtered = filtered.filter((product) =>
        brands.includes(product.brand)
      );
    }

    // Style filter
    if (styles.length > 0) {
      filtered = filtered.filter((product) =>
        styles.includes(product.style)
      );
    }

    // Occasion filter
    if (occasions.length > 0) {
      filtered = filtered.filter((product) =>
        occasions.includes(product.occasion)
      );
    }

    // Material filter
    if (materials.length > 0) {
      filtered = filtered.filter((product) =>
        materials.includes(product.material)
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

const clearFilters = () => {
    setPriceRange([]);
    setSizes([]);
    setColors([]);
    setBrands([]);
    setStyles([]);
    setOccasions([]);
    setMaterials([]);
    setSortBy("featured");
};

  const priceOptions = [
    { label: "Under $100", value: "under-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200 - $300", value: "200-300" },
    { label: "Over $300", value: "over-300" }
  ];

  const sizeOptions = [
    { label: "XS", value: "xs" },
    { label: "S", value: "s" },
    { label: "M", value: "m" },
    { label: "L", value: "l" },
    { label: "XL", value: "xl" },
    { label: "XXL", value: "xxl" }
  ];

  const colorOptions = [
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Yellow", value: "yellow" },
    { label: "Pink", value: "pink" },
    { label: "Purple", value: "purple" },
    { label: "Gray", value: "gray" },
    { label: "Brown", value: "brown" }
  ];

  const [filterOptions, setFilterOptions] = useState({
    sizes: [],
    colors: [],
    brands: [],
    styles: [],
    occasions: [],
    materials: []
  });

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await productService.getUniqueFilterValues();
        setFilterOptions(options);
      } catch (error) {
        console.error("Failed to load filter options:", error);
      }
    };
    loadFilterOptions();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProducts} />;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-primary mb-2 capitalize">
            {category}
          </h1>
          <p className="text-primary/60">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-secondary rounded-lg hover:border-accent transition-colors duration-200"
            >
              <ApperIcon name="SlidersHorizontal" size={20} />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 space-y-8 sticky top-24">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-semibold text-xl text-primary">
                  Filters
                </h2>
{(priceRange.length > 0 || sizes.length > 0 || colors.length > 0 || 
                  brands.length > 0 || styles.length > 0 || occasions.length > 0 || materials.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-accent hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <FilterSection
                title="Price Range"
                options={priceOptions}
                selected={priceRange}
                onChange={setPriceRange}
/>

              <FilterSection
                title="Size"
                options={filterOptions.sizes.length > 0 ? filterOptions.sizes : sizeOptions}
                selected={sizes}
                onChange={setSizes}
              />

              <FilterSection
                title="Color"
                options={filterOptions.colors.length > 0 ? filterOptions.colors : colorOptions}
                selected={colors}
                onChange={setColors}
              />

              <FilterSection
                title="Brand"
                options={filterOptions.brands}
                selected={brands}
                onChange={setBrands}
              />

              <FilterSection
                title="Style"
                options={filterOptions.styles}
                selected={styles}
                onChange={setStyles}
              />

              <FilterSection
                title="Occasion"
                options={filterOptions.occasions}
                selected={occasions}
                onChange={setOccasions}
              />

              <FilterSection
                title="Material"
                options={filterOptions.materials}
                selected={materials}
                onChange={setMaterials}
              />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
            >
              <div
                className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
                onClick={() => setFilterOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto"
              >
                <div className="p-6 space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display font-semibold text-xl text-primary">
                      Filters
                    </h2>
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="text-primary hover:text-accent"
                    >
                      <ApperIcon name="X" size={24} />
                    </button>
                  </div>

                  <FilterSection
                    title="Price Range"
                    options={priceOptions}
                    selected={priceRange}
                    onChange={setPriceRange}
/>

                  <FilterSection
                    title="Size"
                    options={filterOptions.sizes.length > 0 ? filterOptions.sizes : sizeOptions}
                    selected={sizes}
                    onChange={setSizes}
                  />

                  <FilterSection
                    title="Color"
                    options={filterOptions.colors.length > 0 ? filterOptions.colors : colorOptions}
                    selected={colors}
                    onChange={setColors}
                  />

                  <FilterSection
                    title="Brand"
                    options={filterOptions.brands}
                    selected={brands}
                    onChange={setBrands}
                  />

                  <FilterSection
                    title="Style"
                    options={filterOptions.styles}
                    selected={styles}
                    onChange={setStyles}
                  />

                  <FilterSection
                    title="Occasion"
                    options={filterOptions.occasions}
                    selected={occasions}
                    onChange={setOccasions}
                  />

                  <FilterSection
                    title="Material"
                    options={filterOptions.materials}
                    selected={materials}
                    onChange={setMaterials}
                  />
                  <button
onClick={() => {
                      clearFilters();
                      setFilterOpen(false);
                    }}
                    className="w-full px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors duration-200 font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Products */}
          <div className="flex-1">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-primary/60">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-48"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </Select>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <Empty
                icon="Package"
                title="No products found"
                message="Try adjusting your filters to see more results"
                action={{
                  label: "Clear Filters",
                  onClick: clearFilters
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;