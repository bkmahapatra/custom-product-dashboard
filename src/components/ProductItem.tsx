import type { Product } from "../types/products";
import { BiX } from "react-icons/bi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { useCallback, useState } from "react";
import ProductPicker from "./ProductPicker";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

interface PropType {
  index: number;
  product: Product;
  removeProduct: () => void;
  setProduct: (product: Product) => void;
}
const ProductItem = ({
  index,
  product,
  setProduct,
  removeProduct,
}: PropType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowVariants, setIsShowVariants] = useState(false);

  const handleAddDiscount = useCallback(() => {
    const prod = { ...product };
    prod["discounts"] = {
      type: "percentage",
      value: 0,
    };

    setProduct(prod);
  }, [product, setProduct]);

  const removeVariant = useCallback((vIndex: number) => {
    const prod = { ...product };
    prod["variants"].splice(vIndex, 1);
    setProduct(prod);
  }, []);

  const handleDiscountValue = useCallback(
    (value: number) => {
      const prod = { ...product };
      if (prod["discounts"]) {
        prod["discounts"].value = value;
        prod.variants.forEach((v) => {
          if (v.discounts) {
            v.discounts.value = value;
          }
        });
      }
      setProduct(prod);
    },
    [product, setProduct]
  );

  const handleDiscountType = useCallback(
    (value: string) => {
      const prod = { ...product };
      if (prod["discounts"]) {
        prod["discounts"].type = value as "fixed" | "percentage";
        prod.variants.forEach((v) => {
          if (v.discounts) {
            v.discounts.type = value as "fixed" | "percentage";
          }
        });
      }
      setProduct(prod);
    },
    [product, setProduct]
  );

  const handleVariantDiscountValue = useCallback(
    (index: number, value: number) => {
      const prod = { ...product };
      if (prod.variants[index].discounts) {
        prod.variants[index].discounts.value = value;
      }

      setProduct(prod);
    },
    [product]
  );
  const handleVariantDiscountType = useCallback(
    (index: number, value: string) => {
      const prod = { ...product };
      if (prod.variants[index].discounts) {
        prod.variants[index].discounts.type = value as "percentage" | "fixed";
      }

      setProduct(prod);
    },
    [product]
  );

  const handleSubDrop = useCallback(
    (droppedItem: DropResult) => {
      const prod = { ...product };
      const [reorderedItem] = prod["variants"].splice(
        droppedItem.source.index,
        1
      );
      if (droppedItem.destination) {
        prod["variants"].splice(
          droppedItem.destination.index,
          0,
          reorderedItem
        );
      }
      setProduct(prod);
    },
    [product, setProduct]
  );

  return (
    <Draggable key={index} draggableId={`item-${index}`} index={index}>
      {(provided) => (
        <div
          className="my-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="grid grid-cols-[1fr_6fr_4fr_1fr] gap-4">
            <ProductPicker
              isOpen={isModalOpen}
              closeModal={() => setIsModalOpen(false)}
              setProduct={setProduct}
            />

            <div
              className="flex items-center justify-end gap-1"
              {...provided.dragHandleProps}
            >
              <RiDraggable className="text-2xl text-gray-600 cursor-pointer" />
              {index + 1}.
            </div>

            <div
              className="flex justify-between items-center bg-white border shadow-md py-2 px-2 text-sm rounded-md cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              {product.title ? (
                <p className="text-zinc-900">{product.title}</p>
              ) : (
                <p className="text-gray-500">Select Product</p>
              )}

              <FaPen className="text-base text-gray-400" />
            </div>

            {product.discounts ? (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={product.discounts.value}
                  onChange={(e) =>
                    handleDiscountValue(parseFloat(e.target.value))
                  }
                  className="w-auto bg-white border shadow-md py-2 px-2 text-sm rounded-md"
                />
                <select
                  className="bg-white border shadow-md py-2 px-2 text-sm rounded-md"
                  onChange={(e) => handleDiscountType(e.target.value)}
                  value={product.discounts.type}
                >
                  <option value="percentage">% Off</option>
                  <option value="fixed">Flat Off</option>
                </select>
              </div>
            ) : (
              <button
                className="bg-green-800 text-white text-xs font-semibold rounded-md py-2 px-4"
                onClick={handleAddDiscount}
              >
                Add Discount
              </button>
            )}

            <div className="cursor-pointer flex items-center">
              <BiX className="text-2xl text-gray-600" onClick={removeProduct} />
            </div>
          </div>

          {product.variants.length > 1 && (
            <div>
              <div
                className="flex items-end justify-end m-2 text-xs font-semibold underline text-blue-600 cursor-pointer"
                onClick={() => setIsShowVariants(!isShowVariants)}
              >
                {isShowVariants ? (
                  <>
                    <p>Hide Variants</p> <FaAngleUp />
                  </>
                ) : (
                  <>
                    <p>Show Variants</p> <FaAngleDown />
                  </>
                )}
              </div>
            </div>
          )}

          {isShowVariants && (
            <DragDropContext onDragEnd={handleSubDrop}>
              <Droppable droppableId="droppable-sublist">
                {(provided) => (
                  <div
                    className="ml-16 my-4 border-b"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {product.variants.map((variant, index) => (
                      <Draggable
                        key={index}
                        draggableId={`subitem-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={variant.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="grid grid-cols-[0.2fr_2fr_2fr_0.5fr] items-center gap-4 my-3"
                          >
                            <div
                              className="flex items-center justify-end gap-1"
                              {...provided.dragHandleProps}
                            >
                              <RiDraggable className="text-2xl text-gray-600 justify-self-end cursor-pointer" />
                            </div>

                            <div className="bg-white border shadow-md py-2 px-2 text-sm rounded-2xl">
                              {variant.title}
                            </div>

                            <div className="grid grid-cols-2 gap-2 ">
                              <input
                                type="number"
                                value={variant.discounts?.value || 0}
                                onChange={(e) =>
                                  handleVariantDiscountValue(
                                    index,
                                    parseFloat(e.target.value)
                                  )
                                }
                                className="w-auto bg-white border shadow-md py-2 px-2 text-sm rounded-2xl"
                              />
                              <select
                                className="bg-white border shadow-md py-2 px-2 text-sm rounded-2xl"
                                onChange={(e) =>
                                  handleVariantDiscountType(
                                    index,
                                    e.target.value
                                  )
                                }
                                value={variant.discounts?.type}
                              >
                                <option value="percentage">% Off</option>
                                <option value="fixed">Flat Off</option>
                              </select>
                            </div>

                            <BiX
                              className="text-2xl text-gray-600 cursor-pointer"
                              onClick={() => removeVariant(index)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ProductItem;
