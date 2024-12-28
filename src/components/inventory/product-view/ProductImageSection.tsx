import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageSectionProps {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  hasSelectedVariation?: boolean;
}

const ProductImageSection = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  hasSelectedVariation = false,
}: ProductImageSectionProps) => {
  const nextImage = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };

  const prevImage = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden border bg-slate-50 shadow-sm">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={`Product Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2 p-4 text-center">
            <span className="text-slate-400">
              {!hasSelectedVariation 
                ? "Select a size and color to view available images"
                : "No images available for this variation"}
            </span>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                index === currentImageIndex
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageSection;