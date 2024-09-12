import type { Product } from "../types/products";
import { BiX } from "react-icons/bi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { useCallback, useState } from "react";
import ProductPicker from "./ProductPicker";

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

  const handleDiscountValue = useCallback(
    (value: number) => {
      const prod = { ...product };
      if (prod["discounts"]) {
        prod["discounts"].value = value;
      }
      setProduct(prod);
    },
    [product, setProduct]
  );

  const handleDiscountType = useCallback(
    (value: "percentage" | "fixed") => {
      const prod = { ...product };
      if (prod["discounts"]) {
        prod["discounts"].type = value;
      }
      setProduct(prod);
    },
    [product, setProduct]
  );

  return (
    <div className="my-4 ">
      <div className="grid grid-cols-[1fr_6fr_4fr_1fr] gap-4">
        <ProductPicker
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          setProduct={setProduct}
        />

        <div className="flex items-center justify-end gap-1">
          <RiDraggable className="text-2xl text-gray-600" />
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
              onChange={(e) => handleDiscountValue(parseFloat(e.target.value))}
              className="w-auto bg-white border shadow-md py-2 px-2 text-sm rounded-md"
            />
            <select
              className="bg-white border shadow-md py-2 px-2 text-sm rounded-md"
              onChange={(e) =>
                handleDiscountType(e.target.value as "fixed" | "percentage")
              }
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
        <div className="ml-24 my-4">
          {product.variants.map((variant) => (
            <div
              key={variant.id}
              className="grid grid-cols-[0.2fr_2fr_2fr_0.5fr] items-center gap-4 my-3"
            >
              {/* <div></div> */}
              <RiDraggable className="text-2xl text-gray-600 justify-self-end cursor-pointer" />

              <div className="bg-white border shadow-md py-2 px-2 text-sm rounded-2xl">
                {variant.title}
              </div>
              <div className="grid grid-cols-2 gap-2 ">
                <input
                  type="number"
                  value={product?.discounts?.value || 0}
                  // onChange={(e) =>
                  //   handleDiscountValue(parseFloat(e.target.value))
                  // }
                  className="w-auto bg-white border shadow-md py-2 px-2 text-sm rounded-2xl"
                />
                <select
                  className="bg-white border shadow-md py-2 px-2 text-sm rounded-2xl"
                  // onChange={(e) =>
                  //   handleDiscountType(e.target.value as "fixed" | "percentage")
                  // }
                  value={product?.discounts?.type}
                >
                  <option value="percentage">% Off</option>
                  <option value="fixed">Flat Off</option>
                </select>
              </div>
              <BiX
                className="text-2xl text-gray-600 cursor-pointer"
                // onClick={removeProduct}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductItem;
