import { formatPrice } from "../utils/formatPrice";

const ProductCard = ({ imageSrc, name, price, addToCart }: any) => {
 return (
   <div className="card card-compact bg-base-100 w-full shadow-xl border">
     <figure>
       <img
         src={imageSrc}
         alt={name}
         className="w-full object-cover rounded hover:scale-110"
       />
     </figure>
     <div className="card-body">
         <h2 className="card-title text-lg">{name}</h2>
         <p className="text-white mb-2 text-lg font-bold">{formatPrice(price)} </p>

       <div className="card-actions justify-center">
         <button
           onClick={() => addToCart({ imageSrc, name, price, quantity: 1 })}
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded-lg"
         >
           สั่งจอง
         </button>
       </div>
     </div>
   </div>
 );
};
export default ProductCard;
