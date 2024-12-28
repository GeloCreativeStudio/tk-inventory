import { Product } from "@/types/inventory";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StockBadge from "../table/StockBadge";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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

  // Calculate row totals (total stock per size)
  const rowTotals = sizes.reduce((acc, size) => {
    const total = colors.reduce((sum, color) => {
      return sum + (stockMap.get(`${size}-${color}`) ?? 0);
    }, 0);
    acc.set(size, total);
    return acc;
  }, new Map<string, number>());

  // Calculate column totals (total stock per color)
  const columnTotals = colors.reduce((acc, color) => {
    const total = sizes.reduce((sum, size) => {
      return sum + (stockMap.get(`${size}-${color}`) ?? 0);
    }, 0);
    acc.set(color, total);
    return acc;
  }, new Map<string, number>());

  // Calculate overall total
  const overallTotal = Array.from(stockMap.values()).reduce((sum, stock) => sum + stock, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Variation Availability Matrix</h3>
        <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
          Total Stock: {overallTotal}
        </Badge>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[150px] font-semibold text-foreground border-r">
                  <div className="flex items-center justify-between">
                    <span>Size</span>
                    <span className="text-muted-foreground">/</span>
                    <span>Color</span>
                  </div>
                </TableHead>
                {colors.map(color => (
                  <TableHead 
                    key={color}
                    className="text-center font-semibold text-foreground min-w-[100px] border-r"
                  >
                    {color}
                  </TableHead>
                ))}
                <TableHead className="text-center font-semibold text-foreground min-w-[100px] bg-secondary/5">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizes.map((size, index) => (
                <TableRow 
                  key={size}
                  className={cn(
                    "transition-colors hover:bg-muted/5",
                    index % 2 === 0 ? "bg-background" : "bg-muted/30"
                  )}
                >
                  <TableCell className="font-medium border-r">{size}</TableCell>
                  {colors.map(color => {
                    const stock = stockMap.get(`${size}-${color}`) ?? null;
                    return (
                      <TableCell 
                        key={`${size}-${color}`}
                        className="text-center border-r p-2"
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
                  <TableCell className="text-center font-medium bg-secondary/5 p-2">
                    <Badge variant="outline" className="bg-secondary/10">
                      {rowTotals.get(size)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-secondary/5 font-medium hover:bg-secondary/10">
                <TableCell className="border-r">Total</TableCell>
                {colors.map(color => (
                  <TableCell 
                    key={`total-${color}`}
                    className="text-center border-r p-2"
                  >
                    <Badge variant="outline" className="bg-secondary/10">
                      {columnTotals.get(color)}
                    </Badge>
                  </TableCell>
                ))}
                <TableCell className="text-center bg-accent/10 p-2">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {overallTotal}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductVariationMatrix;