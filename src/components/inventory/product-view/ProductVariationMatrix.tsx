import { Product } from "@/types/inventory";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StockBadge from "../table/StockBadge";
import { cn } from "@/lib/utils";

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
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background border-b">
              <TableRow className="hover:bg-background/0">
                <TableHead className="h-12 px-4 text-left align-middle font-medium bg-muted/50">
                  Size / Color
                </TableHead>
                {colors.map(color => (
                  <TableHead 
                    key={color}
                    className="h-12 px-4 text-center align-middle font-medium bg-muted/50"
                  >
                    {color}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizes.map((size, index) => (
                <TableRow 
                  key={size}
                  className={cn(
                    "transition-colors",
                    index % 2 === 0 ? "bg-background" : "bg-muted/30"
                  )}
                >
                  <TableCell className="font-medium border-r">{size}</TableCell>
                  {colors.map(color => {
                    const stock = stockMap.get(`${size}-${color}`) ?? null;
                    return (
                      <TableCell 
                        key={`${size}-${color}`}
                        className="text-center border-r last:border-r-0"
                      >
                        {stock !== null ? (
                          <div className="flex justify-center">
                            <StockBadge stock={stock} />
                          </div>
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
    </div>
  );
};

export default ProductVariationMatrix;