import { HashRouter as Router, Routes, Route } from "react-router";
import NavMenu from './NavMenu'
import ItemDetail from './ItemDetail'
import AdminPanel from './AdminPanel'
import Home from './Home'

function App() {

  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route index element={<Home />} /> 
        <Route path="/Assignment2-ReactSCP" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail/>} />
        <Route path="/admin" element={<AdminPanel/>}/>
      </Routes>
    </Router>
  )
}

export default App
