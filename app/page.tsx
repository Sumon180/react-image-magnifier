import ImageMagnifier from "@/components/ImageMagnifier";
import image from "@/public/cart-image.jpg";

export default function Home() {
  return (
    <div className="w-96 overflow-hidden">
      <ImageMagnifier
        src={image}
        width={1000}
        height={1000}
        alt="single/product-image"
      />
    </div>
  );
}
