import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";
import Hero from "../components/Hero";

const Category = () => {
  const { category } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <div>
      <Hero />
      <section className='py-16'>
        <div className="container mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {categoryProducts.map((product) => (
              <li key={product.id}>
                <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[200px] mx-auto flex justify-center items-center">
                      <img
                        className="max-h-[160px] group-hover:scale-110 transition duration-300"
                        src={product.image}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button onClick={() => addToCart(product)}>
                      <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                        <BsPlus className="text-3xl" />
                      </div>
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
                    >
                      <BsEyeFill />
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="text-sm capitalize text-gray-500 mb-1">
                    {product.category}
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <h2 className="font-semibold mb-1">{product.title}</h2>
                  </Link>
                  <div className="font-semibold">${product.price}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Category;
