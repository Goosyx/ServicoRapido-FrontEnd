import { getImageByProduct } from "@/api/product";
import { ProductRes } from "@/types/productType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type ProductInfoProps = {
  product: ProductRes;
  color?: string;
  size?: string;
};

const ProductInfo = ({ product, color, size }: ProductInfoProps) => {
  const imgQuery = useQuery({
    queryKey: ["productImage", product.id],
    queryFn: () => {
      return getImageByProduct(product.id);
    },
  });

  return (
    <div className="flex gap-2 items-center max-md:flex-col">
      <Image
        alt={product.title}
        src={imgQuery.data?.[0]?.imageUrl || "/no-image.jpg"}
        width={200}
        height={200}
        className="h-20 object-cover w-20"
      />
      <div className="flex flex-col max-md:items-center">
        <p className="font-semibold truncate max-w-80">{product.title}</p>
        <p className="opacity-40 truncate max-w-80">{product.description}</p>
        <p className="opacity-40 truncate max-w-80">Cor:{color}</p>

        <p className="opacity-40 truncate max-w-80">Tamanho:{size}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
