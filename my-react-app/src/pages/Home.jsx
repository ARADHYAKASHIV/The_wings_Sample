import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center">
          <div className="container mx-auto px-4" ref={heroRef}>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center transform transition-all duration-1000 ease-out
                backdrop-blur-sm rounded-2xl p-8 bg-white/5 hover:bg-white/10
                border border-white/10 hover:border-white/20"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white hover:scale-105 transition-transform duration-300">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-600 
                  animate-gradient-x">
                  THE WINGS
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-6">
                Empowering the next generation of innovators and tech leaders
              </p>
              <p className="text-lg md:text-xl text-blue-200 mb-6">
                Join our vibrant community of developers, designers, and creators building the future of technology
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <span className="px-4 py-2 rounded-full bg-white/10 text-blue-200 text-sm">Web Development</span>
                <span className="px-4 py-2 rounded-full bg-white/10 text-blue-200 text-sm">AI & Machine Learning</span>
                <span className="px-4 py-2 rounded-full bg-white/10 text-blue-200 text-sm">Cloud Computing</span>
                <span className="px-4 py-2 rounded-full bg-white/10 text-blue-200 text-sm">UI/UX Design</span>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold 
                    hover:shadow-lg hover:shadow-blue-500/20 group relative overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] 
                    transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full border-2 border-white/80 text-white font-semibold
                    backdrop-blur-sm hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] 
                    transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Weekly Workshops",
                  description: "Join our hands-on workshops covering the latest technologies and programming concepts.",
                  icon: "💻",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Hackathons",
                  description: "Participate in exciting hackathons and build innovative solutions to real-world problems.",
                  icon: "🚀",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  title: "Mentorship",
                  description: "Get guidance from industry professionals and experienced developers.",
                  icon: "🎯",
                  gradient: "from-orange-500 to-red-500"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className={`backdrop-blur-md bg-gradient-to-br ${feature.gradient} bg-opacity-10 p-6 rounded-2xl 
                    border border-white/10 hover:border-white/20 group cursor-pointer`}
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-transparent 
                    group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
              {[
                { number: "500+", label: "Active Members", gradient: "from-blue-400 to-cyan-400" },
                { number: "50+", label: "Weekly Events", gradient: "from-purple-400 to-pink-400" },
                { number: "20+", label: "Tech Projects", gradient: "from-orange-400 to-red-400" },
                { number: "100%", label: "Success Rate", gradient: "from-green-400 to-emerald-400" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className={`backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 
                    hover:border-white/20 group cursor-pointer`}
                >
                  <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} 
                    text-transparent bg-clip-text`}>
                    {stat.number}
                  </div>
                  <div className="text-blue-100 group-hover:text-white transition-colors">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center backdrop-blur-md bg-white/5 p-8 rounded-2xl 
              border border-white/10 hover:border-white/20 transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Ready to Join?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Take the first step towards your tech journey with us
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" 
                  className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                    text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group"
                >
                  <span className="relative z-10">Join Now</span>
                  <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] 
                    transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Home; 