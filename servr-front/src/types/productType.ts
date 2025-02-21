export type ProductRes = {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  status: boolean;
  quantity: number;
  color: string[];
  size: string[];
  materials: string[];
  category: string;
  unit: string;
  weight: number;
  createdAt?: Date;
  updatedAt?: Date;

  user?: {
    stores?: { name: string; id: string }[];
  };
};

export type ProductReq = {
  userId: string;
  title: string;
  description: string;
  price: number;
  status: boolean;
  quantity: number;
  color: string[];
  size: string[];
  materials: string[];
  category: string;
  unit: string;
  weight: number;
  media?: string[];
};

export type updateProductReq = {
  id?: string;
  title: string;
  description: string;
  price: number;
  status: boolean;
  quantity: number;
  color: string[];
  size: string[];
  materials: string[];
  category: string;
  unit: string;
  weight: number;
  media?: string[];
};

export type imageRes = {
  id: string;
  productId: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};
