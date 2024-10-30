import Banner from "@/components/Banner";
import { ProductProps } from "../../type";
import Products from "@/components/products";

interface Props {
  productData: ProductProps[];
}

export default function Home({ productData }: Props) {
  console.log(productData);
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products productData={productData} />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const productData = await res.json();
  return { props: { productData } };
};
