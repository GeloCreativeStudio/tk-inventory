import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProductVariationSectionProps {
  sizes: string[];
  colors: string[];
  selectedSize: string;
  selectedColor: string;
  onSizeSelect: (size: string) => void;
  onColorSelect: (color: string) => void;
  availableColors: string[];
  availableSizes: string[];
}

const ProductVariationSection = ({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeSelect,
  onColorSelect,
  availableColors,
  availableSizes,
}: ProductVariationSectionProps) => {
  return (
    <div className="space-y-6 w-full">
      <Separator className="my-6" />
      
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            Select Size
            {selectedSize && (
              <span className="text-xs text-muted-foreground">
                (Click again to deselect)
              </span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => onSizeSelect(size)}
                disabled={!availableSizes.includes(size)}
                className={`
                  transition-all duration-200
                  ${!availableSizes.includes(size) ? "opacity-50 cursor-not-allowed" : ""}
                  ${selectedSize === size ? "ring-2 ring-primary ring-offset-2" : ""}
                  hover:scale-105
                `}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            Select Color
            {selectedColor && (
              <span className="text-xs text-muted-foreground">
                (Click again to deselect)
              </span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? "default" : "outline"}
                size="sm"
                onClick={() => onColorSelect(color)}
                disabled={!availableColors.includes(color)}
                className={`
                  transition-all duration-200
                  ${!availableColors.includes(color) ? "opacity-50 cursor-not-allowed" : ""}
                  ${selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""}
                  hover:scale-105
                `}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariationSection;