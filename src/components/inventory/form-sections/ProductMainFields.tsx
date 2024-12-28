import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import ProductNameField from "../form-fields/ProductNameField";
import ProductCategoryField from "../form-fields/ProductCategoryField";
import ProductPriceField from "../form-fields/ProductPriceField";

interface ProductMainFieldsProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductMainFields = ({ form }: ProductMainFieldsProps) => {
  return (
    <div className="space-y-6">
      <ProductNameField form={form} />
      <ProductCategoryField form={form} />
      <ProductPriceField form={form} />
    </div>
  );
};

export default ProductMainFields;