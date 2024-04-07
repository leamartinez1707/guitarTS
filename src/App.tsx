import { useReducer, useEffect } from 'react'
import Guitarras from './Componentes/Guitarras'
import Header from './Componentes/Header'
import { cartReducer, initialState } from './reducers/cart-reducers'

function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])


  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Colección</h2>

        <div className="row mt-5">
          {state?.data.map((guitar) => (
            <Guitarras
              key={guitar.id}
              guitar={guitar}
              dispatch={dispatch}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">Mi Guitarra - Todos los derechos reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
