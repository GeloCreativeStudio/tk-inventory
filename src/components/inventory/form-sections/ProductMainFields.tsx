import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import ProductNameField from "../form-fields/ProductNameField";
import ProductCategoryField from "../form-fields/ProductCategoryField";
import ProductPriceField from "../form-fields/ProductPriceField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductMainFieldsProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductMainFields = ({ form }: ProductMainFieldsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProductNameField form={form} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProductCategoryField form={form} />
          <ProductPriceField form={form} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductMainFields;