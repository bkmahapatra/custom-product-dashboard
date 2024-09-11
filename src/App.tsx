import { useCallback, useState } from "react";
import ProductItem from "./components/ProductItem";
import { Product } from "./types/products";

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

  return (
    <div className="w-full h-screen flex items-start justify-center my-20">
      <div className="w-6/12 flex flex-col gap-4">
        <div className="text-lg font-bold my-2">Add Products</div>

        <div className="p-2">
          <div className="grid grid-cols-[1fr_6fr_4fr_1fr] gap-4">
            <div></div>
            <div className="font-semibold text-base">Product</div>
            <div className="font-semibold text-base">Discount</div>
          </div>

          {products.map((product, index) => (
            <ProductItem key={product.id} index={index} product={product} />
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
      </div>
    </div>
  );
}

export default App;
// const fetchProducts = async () => {
//   const url = `http://stageapi.monkcommerce.app/task/products/search?search=Hat&page=1&limit=1`;

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         "x-api-key": "561cc0d3e5d7492abfca16b974f22e22",
//       },
//     });

//     const data = response.data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   fetchProducts();
// }, []);
