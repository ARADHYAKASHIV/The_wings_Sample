import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const socialLinks = [
    { icon: "🐦", label: "Twitter", url: "#" },
    { icon: "📸", label: "Instagram", url: "#" },
    { icon: "💼", label: "LinkedIn", url: "#" },
    { icon: "🐱", label: "GitHub", url: "#" }
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Events", path: "/events" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <footer className="backdrop-blur-sm bg-[#030014]/80 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Brand Section */}
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
            <Link to="/" className="block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                text-transparent bg-clip-text">
                The Wings
              </span>
            </Link>
            <p className="text-blue-100 text-sm">
              Empowering the next generation of innovators and tech leaders.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 
              text-transparent bg-clip-text">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-blue-100 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 
              text-transparent bg-clip-text">
              Contact Us
            </h3>
            <div className="space-y-2 text-blue-100">
              <p>📧 contact@thewings.com</p>
              <p>📞 9981806555</p>
              <p>📍 The Wings GGCT</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 
              text-transparent bg-clip-text">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                    hover:bg-white/10 transition-colors duration-300 group"
                >
                  <span className="group-hover:scale-125 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-white/10 text-blue-100 relative"
        >
          <p className="text-sm absolute left-0">
            Designed & Developed by <a href="https://aradhya.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Aradhya Kashiv</a>
          </p>
          <p className="text-sm text-center">
            © 2024 The Wings. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer; 