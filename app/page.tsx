import ImageMagnifier from "@/components/ImageMagnifier";
import image from "@/public/cart-image.jpg";

export default function Home() {
  return (
    <ImageMagnifier
      src={image}
      width={1000}
      height={1000}
      alt="single/product-image"
    />
  );
}
