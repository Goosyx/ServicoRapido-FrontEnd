import { ProductRes } from "@/types/productType";
import { create } from "zustand";
import useLogged from "./useLogged";
import { createCartItem, deleteCartItem, updateCartItem } from "@/api/cartItem";
import { getCartByClientId } from "@/api/cart";
import { toast } from "@/components/ui/use-toast";

type Cart = {
  cartId: string;
  setCartId: (id: string) => void;
  products:
    | {
        product: ProductRes;
        quantity: number;
        productColor?: string;
        productSize?: string;
        cartItemId?: string;
      }[]
    | [];
  setProducts: (products: Cart["products"]) => void;
  addProduct: (
    product: ProductRes,
    productColor: string,
    productSize: string
  ) => void;
  changeProductQuantity: (
    productId: string,
    quantity: number,
    productColor: string,
    productSize: string
  ) => void;
  deleteProduct: (productId: string, size: string, color: string) => void;
  updateLocalStorage: () => void;
  clearStorage: () => void;
  getbackend: () => Promise<void>;
};

const useCart = create<Cart>()((set, get) => ({
  cartId: "",
  setCartId: (id) => set({ cartId: id }),
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: async (product, productColor, productSize) => {
    const productInCart = get().products[0];
    useLogged.setState({
      storeId: product?.user?.stores && product.user?.stores[0].id,
    });

    if (productInCart) {
      const productUserId = productInCart.product.userId;
      if (product.userId !== productUserId) {
        toast({
          title:
            "Você não pode adicionar produtos de lojas diferentes ao carrinho",
          variant: "destructive",
        });
        return;
      }
    }

    if (!useLogged.getState().logged) {
      set((state) => ({
        products: state.products?.some(
          (p) =>
            p.product?.id === product.id &&
            p.productColor === productColor &&
            p.productSize === productSize
        )
          ? state.products.map((p) =>
              p.product?.id === product.id &&
              p.productColor === productColor &&
              p.productSize === productSize
                ? {
                    product,
                    quantity: p.quantity + 1,
                    productColor,
                    productSize,
                    cartItemId: p.cartItemId,
                  }
                : p
            )
          : [
              ...state.products,
              {
                product,
                quantity: 1,
                productColor,
                productSize,
              },
            ],
      }));
      get().updateLocalStorage();
    } else {
      if (
        get().products?.some(
          (p) =>
            p.product?.id === product.id &&
            p.productColor === productColor &&
            p.productSize === productSize
        )
      ) {
        set((state) => ({
          products: state.products.map((p) =>
            p.product?.id === product.id &&
            p.productColor === productColor &&
            p.productSize === productSize
              ? {
                  product,
                  quantity: p.quantity + 1,
                  productColor,
                  productSize,
                  cartItemId: p.cartItemId,
                }
              : p
          ),
        }));
        await updateCartItem({
          cartItemId: get().products.find(
            (p) =>
              p.product.id === product.id &&
              p.productColor === productColor &&
              p.productSize === productSize
          )?.cartItemId!,
          cartItem: {
            cartId: get().cartId,
            productId: product.id,
            quantity: get().products.find(
              (p) =>
                p.product.id === product.id &&
                p.productColor === productColor &&
                p.productSize === productSize
            )?.quantity!,
            productColor: get().products.find(
              (p) =>
                p.product.id === product.id &&
                p.productColor === productColor &&
                p.productSize === productSize
            )?.productColor!,
            productSize: get().products.find(
              (p) =>
                p.product.id === product.id &&
                p.productColor === productColor &&
                p.productSize === productSize
            )?.productSize!,
          },
        });
      } else {
        set((state) => ({
          products: [
            ...state.products,
            {
              product,
              quantity: 1,
              productColor,
              productSize,
            },
          ],
        }));
        await createCartItem({
          cartId: get().cartId,
          productId: product.id,
          quantity: get().products.find(
            (p) =>
              p.product.id === product.id &&
              p.productColor === productColor &&
              p.productSize === productSize
          )?.quantity!,
          productColor: get().products.find(
            (p) =>
              p.product.id === product.id &&
              p.productColor === productColor &&
              p.productSize === productSize
          )?.productColor!,
          productSize: get().products.find(
            (p) =>
              p.product.id === product.id &&
              p.productColor === productColor &&
              p.productSize === productSize
          )?.productSize!,
        });
      }
    }
    toast({
      title: "Produto adicionado ao carrinho",
    });
    await get().getbackend();
  },
  changeProductQuantity: async (
    productId,
    quantity,
    productColor,
    productSize
  ) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.product?.id === productId &&
        p.productColor === productColor &&
        p.productSize === productSize
          ? { ...p, quantity, productColor, productSize }
          : p
      ),
    }));
    if (!useLogged.getState().logged) {
      get().updateLocalStorage();
    } else {
      await updateCartItem({
        cartItemId: get().products.find(
          (p) =>
            p.product.id === productId &&
            p.productColor === productColor &&
            p.productSize === productSize
        )?.cartItemId!,
        cartItem: {
          cartId: get().cartId,
          productId,
          quantity,
          productColor,
          productSize,
        },
      });
    }
  },
  deleteProduct: async (productId, size, color) => {
    if (!useLogged.getState().logged) {
      set((state) => ({
        products: state.products.filter(
          (p) =>
            p.product?.id !== productId &&
            p.productColor !== color &&
            p.productSize !== size
        ),
      }));
      get().updateLocalStorage();
    } else {
      await get().getbackend();
      await deleteCartItem(
        get().products.find(
          (p) =>
            p.product.id === productId &&
            p.productColor === color &&
            p.productSize === size
        )?.cartItemId!
      );
    }
    await get().getbackend();
  },
  updateLocalStorage: () =>
    get().products.length > 0
      ? localStorage.setItem("cart", JSON.stringify(get().products))
      : localStorage.removeItem("cart"),
  clearStorage: () => {
    localStorage.removeItem("cart");
    set({ products: [] });
  },
  getbackend: async () => {
    if (useLogged.getState().logged) {
      const res = await getCartByClientId(useLogged.getState().client.id);
      set({
        products: res.cartItems
          ? res.cartItems.map((item) => ({
              product: item.product || ({} as ProductRes),
              quantity: item.quantity,
              cartItemId: item.id,
              productColor: item.productColor,
              productSize: item.productSize,
            }))
          : [],
        cartId: res.id,
      });
    }
  },
}));

export default useCart;
