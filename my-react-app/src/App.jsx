import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Contact from './pages/Contact'
import ThreeBackground from './components/ThreeBackground'

function App() {
  return (
    <Router>
      <ParallaxProvider>
        <div className="min-h-screen flex flex-col bg-[#030014]">
          <ThreeBackground />
          <Navbar className="relative z-50" />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <div className="relative z-20">
            <Footer />
          </div>
        </div>
      </ParallaxProvider>
    </Router>
  )
}

export default App
  