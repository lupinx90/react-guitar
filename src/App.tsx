import { useReducer, useEffect, useMemo } from "react";
import { Header } from "./Components/Header";
import { Guitar } from "./Components/Guitar";
import { CartItem, GuitarT } from "./types";
import { cartReducer, initialState } from "./reducers/cart-reducer.ts";

function App() {
  /**
  // State
  const [auth, setAuth] = useState(false)
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])

  // Effect
  useEffect( () => {
    if(auth) console.log("Usuario autenticado");
    console.log("Componente listo o escuchando por auth");
  }, [auth])
   */
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    function saveLocalStorage(): void {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    saveLocalStorage();
  }, [state.cart]);

  const isEmpty = useMemo(() => state.cart.length === 0, [state.cart]);
  const cartTotal = useMemo(
    () : number =>
      (!isEmpty) ? state.cart.reduce(
        (total: number, item: CartItem) => total + item.qty * item.price,
        0
      ) : 0,
    [isEmpty, state.cart]
  );

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state?.data.map((guitar: GuitarT) => (
            <Guitar key={guitar.id} content={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
