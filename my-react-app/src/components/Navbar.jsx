import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="fixed w-full z-50 px-4 top-4">
      <nav className={`
        max-w-5xl mx-auto rounded-2xl transition-all duration-500 ease-in-out
        ${isScrolled 
          ? 'bg-[#030014]/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10' 
          : 'bg-transparent backdrop-blur-sm border border-white/5'
        }
      `}>
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/" 
              className="relative group"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                bg-clip-text text-transparent bg-[length:200%_auto] group-hover:bg-[length:100%_auto] 
                transition-all duration-500">
                THE WINGS
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 
                group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-xl relative overflow-hidden group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] 
                transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 block w-full h-0.5 bg-white transform transition-all duration-300
                  ${isMenuOpen ? 'top-3 rotate-45' : 'top-1'}`}></span>
                <span className={`absolute left-0 block w-full h-0.5 bg-white top-3 
                  transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute left-0 block w-full h-0.5 bg-white transform transition-all duration-300
                  ${isMenuOpen ? 'top-3 -rotate-45' : 'top-5'}`}></span>
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/events', label: 'Events' },
                { path: '/contact', label: 'Contact' }
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`
                    px-4 py-2 rounded-xl relative group overflow-hidden
                    transition-all duration-300 ease-out
                    ${isActive(item.path) 
                      ? 'text-white bg-gradient-to-r from-blue-600/50 to-purple-600/50 backdrop-blur-sm' 
                      : 'text-gray-300 hover:text-white'
                    }
                  `}
                >
                  {/* Hover effect for inactive state */}
                  {!isActive(item.path) && (
                    <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] 
                      transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  )}
                  
                  <span className="relative z-10">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`
            md:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <div className="py-3 space-y-1">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/events', label: 'Events' },
                { path: '/contact', label: 'Contact' }
              ].map((item, index) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`
                    block px-4 py-2 rounded-xl relative overflow-hidden group
                    transition-all duration-300
                    ${isActive(item.path)
                      ? 'text-white bg-gradient-to-r from-blue-600/50 to-purple-600/50 backdrop-blur-sm'
                      : 'text-gray-300 hover:text-white'
                    }
                  `}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {!isActive(item.path) && (
                    <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] 
                      transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  )}
                  <span className="relative z-10">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar 