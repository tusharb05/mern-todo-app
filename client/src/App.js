import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React, {useState} from 'react'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Tabs from './components/Tabs'
import TodoSection from './components/TodoSection'
import AddTodo from './components/AddTodo'

export const AuthContext = React.createContext()
export const TabContext = React.createContext()

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [signedUp, setsignedUp] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [useLess, setUseLess] = useState(false)
  const [userDetails, setUserDetails] = useState({})

  const [tab, setTab] = useState('') //new, starred, completed

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AuthContext.Provider value={{
            loggedIn,
            setLoggedIn,
            signedUp,
            setsignedUp,
            userExists,
            setUserExists,
            userDetails,
            setUserDetails,
            useLess,
            setUseLess
          }}>

            <TabContext.Provider value={{tab, setTab}}>

              <Route path="/" exact>
                <Header/>

                <div className="home" style={{display: 'flex'}}>
                  {
                    !loggedIn &&
                    <h1 style={{margin: 'auto', marginTop: '200px'}}>Log In or Sign Up to see some magin happen!</h1>
                  }
                  {
                    loggedIn &&
                    <>
                    <Tabs/>
                    <TodoSection/>
                    </>
                  }
                </div>

                <AddTodo/> 
              </Route>

              <Route path="/signup" exact>
                <Signup/>
              </Route>

              <Route path="/login" exact>
                <Login/>
              </Route>

            </TabContext.Provider>

          </AuthContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
