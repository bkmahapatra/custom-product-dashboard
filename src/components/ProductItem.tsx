import type { Product } from "../types/products";
import { BiX } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { FaPen } from "react-icons/fa";

interface PropType {
  index: number;
  product: Product;
}
const ProductItem = ({ index, product }: PropType) => {
  return (
    <div className="grid grid-cols-[1fr_6fr_4fr_1fr] my-4 gap-4">
      <div className="flex items-center justify-end gap-1">
        <RiDraggable className="text-2xl text-gray-600" />
        {index + 1}.
      </div>

      <div className="flex justify-between items-center bg-white border shadow-md py-2 px-2 text-sm rounded-md cursor-pointer">
        {product.title ? (
          <p className="text-zinc-900">{product.title}</p>
        ) : (
          <p className="text-gray-500">Select Product</p>
        )}

        <FaPen className="text-base text-gray-400" />
      </div>

      <button className="bg-green-800 text-white text-xs font-semibold rounded-md py-2 px-4">
        Add Discount
      </button>

      <div className="cursor-pointer flex items-center">
        <BiX className="text-2xl text-gray-600" />
      </div>
    </div>
  );
};

export default ProductItem;
