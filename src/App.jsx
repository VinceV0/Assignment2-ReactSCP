// Used 'HashRouter' (renamed to Router) because it keeps page reloads working on GitHub Pages without crashing.
import { HashRouter as Router, Routes, Route } from "react-router";
// Import all the different pages and components of our website
import NavMenu from './NavMenu'
import ItemDetail from './ItemDetail'
import AdminPanel from './AdminPanel'
import Home from './Home'

function App() {

  return (
    <Router>
      {/* Navigation menu stays visible at the top of every screen since it lives outside the changing Routes block */}
      <NavMenu />
      {/* Route manager that listens to the address bar and decides which single component to load */}
      <Routes>
        {/* Default route that automatically renders the Home page component when a user first lands on the site root */}
        <Route index element={<Home />} /> 
        {/* Fallback route matching the GitHub Pages subfolder name to prevent routing errors on deployment */}
        <Route path="/Assignment2-ReactSCP" element={<Home />} />
        {/* Mapped to the Home layout */}
        <Route path="/" element={<Home />} />
        {/* Named alternative route path allowing users to navigate to /Home */}
        <Route path='/Home' element={<Home />} />
        {/* Goes to the SCP details page. It grabs whatever ID number is in the URL bar and sends it to ItemDetail so it knows which SCP entry to display. */}
        <Route path="/item/:id" element={<ItemDetail/>} />
        {/* Load the Admin Panel so they can add, edit, or delete items. */}
        <Route path="/admin" element={<AdminPanel/>}/>
      </Routes>
    </Router>
  )
}

export default App
