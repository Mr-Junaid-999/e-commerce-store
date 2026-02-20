import { addToCartAction } from "@/app/actions/addToCart";

export default function AddToCart({ product }) {
  return (
    <form action={addToCartAction}>
      <input type="hidden" name="product_id" value={product.id} />
      <input
        type="hidden"
        name="price"
        value={product.off_price ? product.off_price : product.price}
      />

      <button
        type="submit"
        className="bg-[#FB2E86] w-[150px] h-[50px] text-white rounded-[6px]"
      >
        Add to Cart
      </button>
    </form>
  );
}
