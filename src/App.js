import React, { useState } from "react";
import './App.css';
import { AnimateSharedLayout } from "framer-motion";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Toaster } from 'react-hot-toast'
import useToken from "./api/useToken";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import useUser from "./useUser";
import Logout from "./components/Logout/Logout";
import Login from "./components/Login/Login";


const App = () => {
  const [isOpenModal, setOpenModal] = useState(false)
  const { token } = useToken()
  const { user, loading: loadingUser, login, logout } = useUser()


  return (
    <div className="container">
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          duration: 5000,
          style: {},

          success: {
            style: {
              border: 'solid green 2px',
            },
          },
          error: {
            duration: 8000,
            style: {
              border: 'solid red 2px',
            },
          },
        }}
      />

      <ModalWindow isOpen={isOpenModal} setOpen={setOpenModal}>
        {user ? (
          <Logout logout={logout}
                  loading={loadingUser}
                  closeModal={() => setOpenModal(false)}
          />
        ) : (
          <Login login={login}
                 loading={loadingUser}
                 closeModal={() => setOpenModal(false)}
          />
        )}
      </ModalWindow>

      <AnimateSharedLayout>
        <BrowserRouter>
          <Switch>
            <Route exact path={ ['/dashboard', '/dashboard/:id'] } component={ () => <Dashboard token={token}/> }/>
            <Route exact path={ ['/', '/:id'] } component={ () => <LandingPage/> }/>
          </Switch>
        </BrowserRouter>
      </AnimateSharedLayout>
    </div>
  );
}

export default App;
