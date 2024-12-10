import React, {useContext} from 'react';
// Import ProductContext
import {ProductContext} from '../contexts/ProductContext';
// Import Product component
import Product from '../components/Product';
import Hero from '../components/Hero';

const Home = () => {
  //get products from ProductContext
  const { products } = useContext(ProductContext);
  //get only men`s & women`s clothing caregory
  const filteredProducts = products.filter((item) => {
    return (
      item.category === "men's" || item.category === "women's" || item.category === "jewelery"
    )
  });

  return (
    <div>
      <Hero />
      <section className='py-16'>
        <div className="container mx-auto">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id}/>
            })};
          </div>
        </div>
      </section>
    </div>
    );
  };

export default Home;
