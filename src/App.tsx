import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import MainPage from '@/pages/MainPage/MainPage.tsx'

const App = () => {
  return (
    <Router>
      <div className='app'>
        <span />
        <Routes>
          <Route path='/' element={<MainPage />} />
          {/*<Route path="/rent" element={} />*/}
          {/*<Route path='/offer/:id' element={} />*/}
        </Routes>
      </div>
    </Router>
  )
}

export default App
