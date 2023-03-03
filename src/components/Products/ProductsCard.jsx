import {MdOutlineAccountCircle } from "react-icons/md";
import {BiStoreAlt} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {GiPriceTag} from "react-icons/gi";

const ProductsCard = ({ product }) => {
    const navigate = useNavigate();
  const { name, description, price, img, stock } = product;
  return (
    <>
      <div className="shadow-xl rounded-lg relative">
        <h1 className="text-2xl font-bold bg-blue-strong text-white-cust p-4 mb-12">
          {name}
        </h1>
        <GiPriceTag className="absolute top-20 -left-4 text-[4rem] text-red-700 b p-2 rounded-full" />
        <img
          src={img}
          alt={name}
          className="
                h-[500px] w-full object-cover
            "
        />
        <div className="pt-12 bg-transparent border-t-4 border-stone-cust text-stone-cust mt-10 overflow-hidden">
          <div className="text-lg font-bold mb-2 h-[60px] px-8">
            {description}
          </div>
          <div className="flex items-center justify-center gap-6 py-10">
            <p className="circle bg-black"></p>
            <p className="circle bg-red-900"></p>
            <p className="circle bg-stone-hover"></p>
          </div>
          <button className="bg-blue-strong text-white-cust p-1 my-4 mr-[-20px] hover:mr-[-10px] w-[250px] rounded-xl flex items-center justify-evenly ml-auto"
            onClick={() => {
              setTimeout(() => {
                navigate("/login");
              }, 1000);
            }}
          >
            <MdOutlineAccountCircle className="text-2xl mr-2" />
            <p>Login to get a discount!</p>
          </button>
          <div className="flex gap-4 items-center justify-between my-6 px-2">
            <div className="flex items-center justify-center gap-4 rounded-xl bg-slate-50 w-[150px] p-1 mb-2 hover:scale-105 transition-all duration-300 ease-in">
              <BiStoreAlt className="text-2xl text-blue-strong" />
              <p className="text-center text-black-cust font-bold">
                Stock: {stock}
              </p>
            </div>
            <div className="text-lg text-right text-neutral-200 font-bold mb-2">
              <span className="text-sm text-red-900 mr-2 line-through block">
                USD${price}
              </span>
              <span className="text-2xl text-black-cust mr-2 block">
                USD${price * 0.9}
              </span>
            </div>
          </div>
          <div>
            <button className="bg-stone-cust hover:bg-stone-hover text-white-cust font-bold p-5 mt-8 w-full">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCard;
