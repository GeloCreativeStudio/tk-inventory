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
          <h3 className="text-sm font-medium text-foreground">Select Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => onSizeSelect(size)}
                disabled={!availableSizes.includes(size)}
                className="min-w-[60px]"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Select Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? "default" : "outline"}
                size="sm"
                onClick={() => onColorSelect(color)}
                disabled={!availableColors.includes(color)}
                className="min-w-[60px]"
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