import { useCallback, useState } from "react";
import ProductItem from "./components/ProductItem";
import { Product } from "./types/products";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

const generateId = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return randomNumber;
};
function DashBoard() {
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

  const handleDrop = (droppedItem: DropResult) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...products];

    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

    // Update State
    setProducts(updatedList);
  };

  return (
    <div className="w-full min-h-[calc(100vh-3rem)] flex items-start justify-center py-14 z-10">
      <div className="w-6/12 flex flex-col gap-4">
        <div className="text-lg font-bold my-2">Add Products</div>

        <div className="p-2">
          <div className="grid grid-cols-[1fr_6fr_4fr_1fr] gap-4 py-1 border-b">
            <div></div>
            <div className="font-semibold text-base">Product</div>
            <div className="font-semibold text-base">Discount</div>
          </div>

          {products.length == 0 && (
            <div className="m-4 p-3 rounded-lg text-center ">
              No products found. Try adding some products.
            </div>
          )}

          <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {products.map((product, index) => (
                    <ProductItem
                      key={product.id}
                      index={index}
                      product={product}
                      removeProduct={removeProduct(index)}
                      setProduct={handleProductChange(index)}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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

export default DashBoard;
