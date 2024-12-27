import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { configureStore } from './redux/configureStore'
import { createRoot } from 'react-dom/client'

import AppContainer from './AppContainer'
import initApiServices from './utils/initApiServices'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  const [store, setStore] = useState(false)
  const [persistor, setPersistor] = useState(false)

  useEffect(() => {
    configureStore(({ store: newStore, persistor: newPersistor }) => {
      initApiServices(newStore)
      setStore(newStore)
      setPersistor(newPersistor)
    })
  }, [])

  return store && persistor ? (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  ) : (
    <h1>Loading ......</h1>
  )
}

createRoot(document.getElementById('root')).render(<App />)
