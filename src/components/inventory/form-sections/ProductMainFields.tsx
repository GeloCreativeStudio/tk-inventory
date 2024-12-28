import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import ProductNameField from "../form-fields/ProductNameField";
import ProductCategoryField from "../form-fields/ProductCategoryField";
import ProductPriceField from "../form-fields/ProductPriceField";
import ProductImageField from "../form-fields/ProductImageField";

interface ProductMainFieldsProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductMainFields = ({ form }: ProductMainFieldsProps) => {
  return (
    <div className="space-y-4">
      <ProductNameField form={form} />
      <ProductCategoryField form={form} />
      <ProductPriceField form={form} />
      <ProductImageField form={form} />
    </div>
  );
};

export default ProductMainFields;