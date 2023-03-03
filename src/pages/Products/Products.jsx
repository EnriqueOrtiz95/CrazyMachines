import { Helmet } from "react-helmet-async";
import dataProducts from '../../components/Products/dataProducts';
import ProductsCard from '../../components/Products/ProductsCard';
import BackTopPage from "../../components/UI/BackTopPage";

const Products = () => {
  return (
    <>
      <Helmet>
        <title>Crazy Machines | Products</title>
        <meta name="description" content="Crazy Machine's Products" />
      </Helmet>

      <section className="">
        <h1 className="pb-[15rem]">Products</h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 w-[90%] mx-auto md:w-auto">
          {dataProducts.map((product) => {
            const { id } = product;
            return <ProductsCard key={id} product={product} />;
          })}
        </div>
      </section>
      <BackTopPage />
    </>
  );
};

export default Products;
