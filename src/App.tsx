import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.css'

// import HomePage from './pages/HomePage'
// import MapPage from './pages/MapPage'
// import PropertyPage from './pages/PropertyPage'

const App = () => {
  return (
    <Router>
      <div className='app'>
        <span />
        <Routes>
          <Route
            path='/'
            element={<h1 className='text-2xl font-bold underline'> Hello world! </h1>}
          />
          {/*<Route path="/rent" element={<MapPage />} />*/}
          {/*<Route path='/offer/:id' element={<PropertyPage />} />*/}
        </Routes>
      </div>
    </Router>
  )
}

export default App
