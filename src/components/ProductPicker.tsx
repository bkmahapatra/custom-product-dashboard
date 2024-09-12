import { BiX } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "react-modal";
import {
  // FetchedProductVariant,
  FetechedProduct,
  Product,
} from "../types/products";
import { useCallback, useEffect, useState } from "react";

const data = [
  {
    id: 6805248770255,
    title: "Example Hat 1",
    vendor: "Acme",
    handle: "1",
    created_at: "2021-08-15T18:20:04Z",
    updated_at: "2024-03-29T20:26:01Z",
    published_at: "2024-03-29T20:19:44Z",
    tags: "mens hat example",
    options: [
      {
        id: 8720141779151,
        product_id: 6805248770255,
        name: "Title",
        position: 1,
        values: ["Grey"],
      },
    ],
    image: {
      id: 29377096974543,
      product_id: 6805248770255,
      src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie.jpg?v=1629051604",
    },
    images: [
      {
        id: 29377096974543,
        product_id: 6805248770255,
        src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie.jpg?v=1629051604",
      },
    ],
    admin_graphql_api_id: "gid://shopify/Product/6805248770255",
    status: "active",
    variants: [
      {
        id: 40499643351247,
        product_id: 6805248770255,
        title: "Grey",
        inventory_policy: "deny",
        price: "17.99",
        compare_at_price: "22.99",
        option1: "Grey",
        created_at: "2021-08-15T18:20:04Z",
        updated_at: "2023-10-27T14:35:18Z",
        inventory_quantity: -76,
        admin_graphql_api_id: "gid://shopify/ProductVariant/40499643351247",
      },
    ],
  },
  {
    id: 6805249130703,
    title: "Example Hat 10",
    vendor: "Acme",
    handle: "10",
    created_at: "2021-08-15T18:20:42Z",
    updated_at: "2023-10-23T12:32:05Z",
    published_at: "2021-08-18T09:35:58Z",
    tags: "mens hat example",
    options: [
      {
        id: 8720142205135,
        product_id: 6805249130703,
        name: "Title",
        position: 1,
        values: ["Grey"],
      },
    ],
    image: {
      id: 29377098547407,
      product_id: 6805249130703,
      src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie_cfeb91dd-a183-4ff5-9f6d-4ff512f51132.jpg?v=1629051642",
    },
    images: [
      {
        id: 29377098547407,
        product_id: 6805249130703,
        src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie_cfeb91dd-a183-4ff5-9f6d-4ff512f51132.jpg?v=1629051642",
      },
    ],
    admin_graphql_api_id: "gid://shopify/Product/6805249130703",
    status: "active",
    variants: [
      {
        id: 40499644629199,
        product_id: 6805249130703,
        title: "Grey",
        inventory_policy: "deny",
        price: "17.95",
        compare_at_price: "22.99",
        option1: "Grey",
        created_at: "2021-08-15T18:20:42Z",
        updated_at: "2023-10-27T14:35:18Z",
        inventory_quantity: -42,
        admin_graphql_api_id: "gid://shopify/ProductVariant/40499644629199",
      },
    ],
  },
  {
    id: 6805253062863,
    title: "Example Hat 101",
    vendor: "Acme",
    handle: "101",
    created_at: "2021-08-15T18:27:32Z",
    updated_at: "2024-02-23T16:10:03Z",
    published_at: "2021-08-18T09:36:02Z",
    tags: "mens hat example",
    options: [
      {
        id: 8720146694351,
        product_id: 6805253062863,
        name: "Title",
        position: 1,
        values: ["Grey"],
      },
    ],
    image: {
      id: 29377120305359,
      product_id: 6805253062863,
      src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie_6e73c2e5-885d-43cb-9fae-2fb9670cfa66.jpg?v=1629052052",
    },
    images: [
      {
        id: 29377120305359,
        product_id: 6805253062863,
        src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie_6e73c2e5-885d-43cb-9fae-2fb9670cfa66.jpg?v=1629052052",
      },
    ],
    admin_graphql_api_id: "gid://shopify/Product/6805253062863",
    status: "active",
    variants: [
      {
        id: 40499657113807,
        product_id: 6805253062863,
        title: "Grey",
        inventory_policy: "deny",
        price: "17.99",
        compare_at_price: "22.99",
        option1: "Grey",
        created_at: "2021-08-15T18:27:32Z",
        updated_at: "2024-02-23T16:06:04Z",
        inventory_quantity: -3,
        admin_graphql_api_id: "gid://shopify/ProductVariant/40499657113807",
      },
    ],
  },
  {
    id: 6805253095631,
    title: "Example Hat 102",
    vendor: "Acme",
    handle: "102",
    created_at: "2021-08-15T18:27:36Z",
    updated_at: "2023-05-22T16:45:09Z",
    published_at: "2021-08-23T13:21:45Z",
    tags: "mens hat example",
    options: [
      {
        id: 8720146727119,
        product_id: 6805253095631,
        name: "Title",
        position: 1,
        values: ["Grey"],
      },
    ],
    image: {
      id: 29377120436431,
      product_id: 6805253095631,
      src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie_157b20fd-defe-4b3e-a91a-597d51444ab9.jpg?v=1629052056",
    },
    images: [
      {
        id: 29377120436431,
        product_id: 6805253095631,
        src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie_157b20fd-defe-4b3e-a91a-597d51444ab9.jpg?v=1629052056",
      },
    ],
    admin_graphql_api_id: "gid://shopify/Product/6805253095631",
    status: "active",
    variants: [
      {
        id: 40499657146575,
        product_id: 6805253095631,
        title: "Grey",
        inventory_policy: "deny",
        price: "17.99",
        compare_at_price: "22.99",
        option1: "Grey",
        created_at: "2021-08-15T18:27:36Z",
        updated_at: "2023-10-27T14:35:23Z",
        inventory_quantity: -2,
        admin_graphql_api_id: "gid://shopify/ProductVariant/40499657146575",
      },
    ],
  },
  {
    id: 6805253193935,
    title: "Example Hat 103",
    vendor: "Acme",
    handle: "103",
    created_at: "2021-08-15T18:27:40Z",
    updated_at: "2023-06-07T15:45:05Z",
    published_at: "2021-10-28T19:14:21Z",
    tags: "mens hat example",
    options: [
      {
        id: 8720146858191,
        product_id: 6805253193935,
        name: "Title",
        position: 1,
        values: ["Grey"],
      },
    ],
    image: {
      id: 29377120501967,
      product_id: 6805253193935,
      src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie_fe69295e-2905-4fd8-890b-bc6ba2b6aad8.jpg?v=1629052060",
    },
    images: [
      {
        id: 29377120501967,
        product_id: 6805253193935,
        src: "https://cdn.shopify.com/s/files/1/0506/8439/5727/products/kids-beanie_fe69295e-2905-4fd8-890b-bc6ba2b6aad8.jpg?v=1629052060",
      },
    ],
    admin_graphql_api_id: "gid://shopify/Product/6805253193935",
    status: "active",
    variants: [
      {
        id: 40499657310415,
        product_id: 6805253193935,
        title: "Grey",
        inventory_policy: "deny",
        price: "17.99",
        compare_at_price: "22.99",
        option1: "Grey",
        created_at: "2021-08-15T18:27:40Z",
        updated_at: "2023-10-27T14:35:23Z",
        inventory_quantity: -2,
        admin_graphql_api_id: "gid://shopify/ProductVariant/40499657310415",
      },
    ],
  },
];
interface PropType {
  // data: FetechedProduct[];
  isOpen: boolean;
  closeModal: () => void;
  setProduct: (product: Product) => void;
}

const ProductPicker = ({ isOpen, closeModal, setProduct }: PropType) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<FetechedProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(
    async (searchTerm: string, page: number) => {
      // const url = `https://stageapi.monkcommerce.app/task/products/search?search=${searchTerm}&page=${page}&limit=5`;
      const url = `https://stageapi.monkcommerce.app/task/products/search?search=${searchTerm}&page=${page}&limit=5`;

      setIsLoading(true);
      try {
        // const customHeaders = new Headers();
        // customHeaders.append("x-api-key", "72njgfa948d9aS7gs5");

        // const reqOptions = {
        //   method: "GET",
        //   headers: { "x-api-key": "72njgfa948d9aS7gs5" },
        //   redirect: "follow",
        // };

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-api-key": "72njgfa948d9aS7gs5",
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (searchTerm === "") {
      fetchProducts(searchTerm, page);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
      fetchProducts(searchTerm, page);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm, page, isOpen]);

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
                              {variant?.inventory_quantity || ""} available
                            </div>
                            <div>${variant.price}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
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
