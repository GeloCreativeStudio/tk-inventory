import { Product } from "@/types/inventory";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StockBadge from "../table/StockBadge";

interface ProductVariationMatrixProps {
  product: Product;
}

const ProductVariationMatrix = ({ product }: ProductVariationMatrixProps) => {
  // Get unique sizes and colors
  const sizes = [...new Set(product.variations.map(v => v.size))];
  const colors = [...new Set(product.variations.map(v => v.color))];

  // Create a map for quick stock lookup
  const stockMap = new Map(
    product.variations.map(v => [`${v.size}-${v.color}`, v.stock])
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Variation Availability Matrix</h3>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size / Color</TableHead>
              {colors.map(color => (
                <TableHead key={color}>{color}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes.map(size => (
              <TableRow key={size}>
                <TableCell className="font-medium">{size}</TableCell>
                {colors.map(color => {
                  const stock = stockMap.get(`${size}-${color}`) ?? null;
                  return (
                    <TableCell key={`${size}-${color}`}>
                      {stock !== null ? (
                        <StockBadge stock={stock} />
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductVariationMatrix;