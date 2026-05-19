import { BrowserRouter as Router, Route, Routes } from "react-router" // Remember it's react-router without dom
import NavMenu from './NavMenu'
import ItemDetail from './ItemDetail'
import AdminPanel from './AdminPanel'
import Home from './Home'

function App() {

  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail/>} />
        <Route path="/admin" element={<AdminPanel/>}/>
      </Routes>
    </Router>
  )
}

export default App
