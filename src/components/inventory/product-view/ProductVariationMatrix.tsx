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
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0 py-4">
        <h3 className="text-xl font-semibold tracking-tight">Variation Availability Matrix</h3>
        <div className="text-sm">
          Total Stock: <span className="font-semibold text-primary">{overallTotal}</span>
        </div>
      </div>

      <div className="relative rounded-xl border shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
              <TableRow className="hover:bg-background/0 border-b">
                <TableHead className="h-12 px-4 text-left align-middle font-medium bg-muted/50 w-32">
                  Size / Color
                </TableHead>
                {colors.map(color => (
                  <TableHead 
                    key={color}
                    className="h-12 px-6 text-center align-middle font-medium bg-muted/50 min-w-[120px]"
                  >
                    {color}
                  </TableHead>
                ))}
                <TableHead className="h-12 px-6 text-center align-middle font-medium bg-muted/50 w-32">
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
                    index % 2 === 0 ? "bg-background" : "bg-muted/[0.025]"
                  )}
                >
                  <TableCell className="font-medium border-r px-4">{size}</TableCell>
                  {colors.map(color => {
                    const stock = stockMap.get(`${size}-${color}`) ?? null;
                    return (
                      <TableCell 
                        key={`${size}-${color}`}
                        className="text-center border-r px-6"
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
                  <TableCell className="text-center font-medium bg-muted/10 px-6">
                    {rowTotals.get(size)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/5 font-medium border-t">
                <TableCell className="border-r px-4">Total</TableCell>
                {colors.map(color => (
                  <TableCell 
                    key={color}
                    className="text-center border-r px-6"
                  >
                    {columnTotals.get(color)}
                  </TableCell>
                ))}
                <TableCell className="text-center bg-muted/20 font-semibold px-6">
                  {overallTotal}
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