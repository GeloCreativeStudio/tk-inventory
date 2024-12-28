import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StockBadgeProps {
  stock: number;
  isVariationSelected?: boolean;
}

const StockBadge = ({ stock, isVariationSelected }: StockBadgeProps) => {
  const getStockStatus = (stock: number) => {
    if (stock <= 5) return "critical";
    if (stock <= 10) return "warning";
    return "normal";
  };

  const status = getStockStatus(stock);
  
  const badgeStyles = {
    critical: "bg-red-100 text-red-700 hover:bg-red-100",
    warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    normal: "bg-green-100 text-green-700 hover:bg-green-100",
  };

  const stockText = isVariationSelected 
    ? `${stock} in stock for selected variation`
    : `${stock} total in stock`;

  return (
    <Badge 
      variant="secondary"
      className={cn(
        "font-medium transition-all duration-200",
        badgeStyles[status],
        isVariationSelected && "ring-2 ring-primary ring-offset-2"
      )}
    >
      {stockText}
    </Badge>
  );
};

export default StockBadge;