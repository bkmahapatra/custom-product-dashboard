import { BiX } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "react-modal";
import { FetechedProduct, Product } from "../types/products";
import { useCallback, useEffect, useRef, useState } from "react";

interface PropType {
  // data: FetechedProduct[];
  isOpen: boolean;
  closeModal: () => void;
  setProduct: (product: Product) => void;
}

const ProductPicker = ({ isOpen, closeModal, setProduct }: PropType) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<FetechedProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const listRef = useRef(null);

  // product fetch operation
  const fetchProducts = useCallback(
    async (searchTerm: string, page: number) => {
      const url = `https://stageapi.monkcommerce.app/task/products/search?search=${searchTerm}&page=${page}&limit=6`;

      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-api-key": "72njgfa948d9aS7gs5",
          },
        });
        const data = await response.json();
        setProducts((prev) => [...prev, ...data]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // search query
  useEffect(() => {
    if (!isOpen || searchTerm === null) {
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setProducts([]);
      fetchProducts(searchTerm, 1);
      setPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // page change
  useEffect(() => {
    if (isOpen) {
      fetchProducts(searchTerm || "", page);
    }
  }, [page, isOpen]);

  // infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log({ entries });
        const entry = entries[0];

        if (entry.isIntersecting && !isLoading) {
          console.log("first");
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    return () => {
      if (listRef.current) {
        observer.unobserve(listRef.current);
      }
    };
  }, [isLoading]);

  const handleAddProduct = () => {
    if (selectedProduct) {
      setProduct(selectedProduct);
      closeModal();
    }
  };

  const handleSetProduct = (product: FetechedProduct) => {
    if (product.id === selectedProduct?.id) {
      setSelectedProduct(null);
      return;
    }

    setSelectedProduct({
      id: product.id,
      title: product.title,
      variants: product.variants.map((v) => ({
        id: v.id,
        title: v.title,
        discounts: {
          type: "percentage",
          value: 0,
        },
      })),
    });
  };

  const handleSetVariants = (pId: number, vId: number) => {
    const prod = products.find((p) => p.id === pId);

    if (prod && prod?.id !== selectedProduct?.id) {
      setSelectedProduct({
        id: prod.id,
        title: prod.title,
        variants: prod.variants
          .filter((v) => v.id === vId)
          .map((v) => ({
            id: v.id,
            title: v.title,
          })),
      });
    } else {
      const vIndex =
        selectedProduct?.variants.findIndex((v) => v.id === vId) ?? -1;
      if (selectedProduct && vIndex !== -1) {
        const newVariants = [...selectedProduct.variants];
        newVariants.splice(vIndex, 1);
        setSelectedProduct({ ...selectedProduct, variants: newVariants });
      } else {
        if (selectedProduct && prod) {
          const newVariant = prod.variants.find((v) => v.id === vId);
          const newVariants = [...selectedProduct.variants];

          if (newVariant) {
            newVariants.push({
              id: newVariant?.id,
              title: newVariant?.title,
            });
          }

          setSelectedProduct({ ...selectedProduct, variants: newVariants });
        }
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          padding: "0px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      }}
      ariaHideApp={false}
    >
      <div className="py-2">
        <div className="flex justify-between items-center py-1 px-5 border-b">
          <p className="font-semibold text-xl">Select Products</p>
          <BiX
            className="text-3xl text-gray-900 cursor-pointer"
            onClick={closeModal}
          />
        </div>

        <div className="py-3 px-5 border-b">
          <div className="flex justify-between items-center border border-gray-300 rounded-sm px-2 py-1">
            <IoSearchOutline className="text-2xl text-gray-400" />
            <input
              type="text"
              placeholder="Search products"
              className="w-full py-1 px-1  focus:outline-none text-base"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="h-72 overflow-y-scroll">
          {products?.length > 1 &&
            products.map((product) => {
              return (
                <div key={product.id} className="text-sm">
                  <div className="flex items-center gap-2 py-3 px-5  border-b">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-green-700"
                      checked={
                        selectedProduct?.id === product.id ? true : false
                      }
                      onChange={() => handleSetProduct(product)}
                    />
                    <img
                      src={
                        product.image?.src ||
                        "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie.jpg?v=1629051604"
                      }
                      alt="product image"
                      className="w-8 h-8 rounded-md"
                    />
                    <div>{product.title}</div>
                    <div></div>
                  </div>

                  <div className="">
                    {product.variants?.length &&
                      product.variants.map((variant) => {
                        return (
                          <div
                            key={variant.id}
                            className="grid grid-cols-[0.5fr_6fr_4fr_1fr] gap-2 py-3 px-14 border-b "
                          >
                            {/* <div></div> */}
                            <input
                              type="checkbox"
                              className="accent-green-700"
                              checked={
                                selectedProduct?.variants?.some(
                                  (item) => item.id === variant.id
                                )
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                handleSetVariants(product.id, variant.id)
                              }
                            />
                            <div>{variant.title}</div>
                            <div>
                              {variant?.inventory_quantity || 0} available
                            </div>
                            <div>${variant.price}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}

          <div ref={listRef} className="h-8 m-3 text-center">
            {isLoading && <p>Loading...</p>}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="p-3">{selectedProduct ? 1 : 0}/1</p>
          <div className="flex justify-end p-2 border-t gap-2">
            <button
              className="w-16 font-semibold text-xs border border-gray-300  bg-gray-100  p-2 rounded-md"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="w-16 font-semibold text-xs border text-white bg-green-700 p-2 rounded-md"
              onClick={handleAddProduct}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductPicker;
// const customHeaders = new Headers();
// customHeaders.append("x-api-key", "72njgfa948d9aS7gs5");

// const reqOptions = {
//   method: "GET",
//   headers: { "x-api-key": "72njgfa948d9aS7gs5" },
//   redirect: "follow",
// };
