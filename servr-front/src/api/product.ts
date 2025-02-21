import {
  ProductReq,
  ProductRes,
  imageRes,
  updateProductReq,
} from "@/types/productType";
import { api } from "./api";

export const createProduct = async (
  product: ProductReq
): Promise<ProductRes> => {
  const response = await api.post("/product", product);
  return response.data;
};

export const getProducts = async (): Promise<ProductRes[]> => {
  const response = await api.get("/product");
  return response.data;
};

export const getProductByUser = async (
  userId: string
): Promise<ProductRes[]> => {
  const response = await api.get(`/product/user/${userId}`);
  return response.data;
};

export const updateProduct = async (product: updateProductReq) => {
  const response = await api.put(`/product/${product.id}`, product);
  return response.data;
};

export const getProduct = async (id: string): Promise<ProductRes> => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

export const getImageByProduct = async (id: string): Promise<imageRes[]> => {
  const response = await api.get(`/images/product/${id}`);
  return response.data;
};

export const getImages = async (): Promise<imageRes[]> => {
  const response = await api.get("/images");
  return response.data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/product/${id}`);
};

export const deleteImage = async (id: string): Promise<void> => {
  await api.delete(`/images/${id}`);
};