import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";


const Checkout = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const { cart, total, clearCart} = useContext(CartContext);

  const order = {
    buyer: {
      name: name,
      surname: surname,
      phone: phone,
      email: email,
    },
    items: cart,
    total: total,
  };

  const handleClick = (event) => {
    event.preventDefault();
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, order).then(({ id }) => {
      Swal.fire(
        "¡Thank you for your purchase!",
        `Your order number is: ${id}`,
        'success'
      )
      clearCart();
      setName("");
      setSurname("");
      setPhone("");
      setEmail("");
      setConfirmEmail("");
    });
  };

  const handleConfirmEmail = () => {
    if (email !== confirmEmail) {
      alert("Los emails no coinciden");
    }
  };
  return (
    <div className="max-w-7xl min-h-screen mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mt-16 text-center border-b-2 border-black rounded-lg">Checkout</h1>
        </div>
        <table className="w-full text-left border-collapse flex justify-center text-xl my-10">
          <thead>
            <tr >
              <th className="py-3 px-4 font-semibold text-gray-700 border-b-2">
                Producto
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <tr>
              <td className="py-3 px-4 border-b-2 font-semibold">Total:</td>
              <td >${total}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl font-semibold text-gray-900 my-6 flex justify-center">
          Información de envío
        </h2>
        <div className="flex justify-center">
          <form className="max-w-md">
            <div className="mb-4 ">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Nombre:
              </label>
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-400 text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <label className="block text-gray-700 font-semibold mb-2">
              Apellido:
              <input
                type="text"
                placeholder="Apellido"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-400 text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Teléfono:
              <input
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-400 text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Email:
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-400 text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-gray-700 font-semibold mb-2">
              Confirmar Email:
              <input
                type="email"
                placeholder="Confirmar Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                onBlur={handleConfirmEmail}
                className="w-full px-3 py-2 rounded-lg border border-gray-400 text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </label>
            <button
              className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium rounded-lg transition duration-300 hover:scale-105"
              onClick={handleClick}
            >
              Comprar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
