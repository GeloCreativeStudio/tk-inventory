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
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <ProductNameField form={form} />
        <ProductCategoryField form={form} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <ProductPriceField form={form} />
        <ProductImageField form={form} />
      </div>
    </div>
  );
};

export default ProductMainFields;