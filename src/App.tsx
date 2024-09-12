import { useCallback, useState } from "react";
import ProductItem from "./components/ProductItem";
import { Product } from "./types/products";
// import ProductPicker from "./components/ProductPicker";

const generateId = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return randomNumber;
};
function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProducts = useCallback(() => {
    const newProduct: Product = {
      id: generateId(),
      title: "",
      variants: [],
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  }, []);

  const handleProductChange = (index: number) => {
    return (productData: Product) => {
      const newProducts = [...products];
      newProducts[index] = productData;
      setProducts(newProducts);
    };
  };

  const removeProduct = useCallback((index: number) => {
    return () => {
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        newProducts.splice(index, 1);
        return newProducts;
      });
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-start justify-center py-20">
      <div className="w-6/12 flex flex-col gap-4">
        <div className="text-lg font-bold my-2">Add Products</div>

        <div className="p-2">
          <div className="grid grid-cols-[1fr_6fr_4fr_1fr] gap-4">
            <div></div>
            <div className="font-semibold text-base">Product</div>
            <div className="font-semibold text-base">Discount</div>
          </div>

          {products.map((product, index) => (
            <ProductItem
              key={product.id}
              index={index}
              product={product}
              removeProduct={removeProduct(index)}
              setProduct={handleProductChange(index)}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="px-8 py-2 text-sm font-semibold text-green-700 border-2 border-green-700 rounded-md"
            onClick={handleAddProducts}
          >
            Add Product
          </button>
        </div>
        {/* <ProductPicker /> */}
      </div>
    </div>
  );
}

export default App;
