import { motion } from 'framer-motion';

function Contact() {
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
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <div className="min-h-screen bg-transparent text-white pt-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                text-transparent bg-clip-text">
                Get in Touch
              </h1>
              <p className="text-xl text-blue-100">
                Have questions? We'd love to hear from you.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.form 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="backdrop-blur-md bg-white/5 p-8 rounded-2xl border border-white/10 
                  hover:border-white/20 transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-blue-100 font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 
                        text-white placeholder-blue-200/50 outline-none transition-all duration-300"
                      placeholder="John"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-blue-100 font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 
                        text-white placeholder-blue-200/50 outline-none transition-all duration-300"
                      placeholder="Doe"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="md:col-span-2">
                    <label className="block text-blue-100 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 
                        text-white placeholder-blue-200/50 outline-none transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="md:col-span-2">
                    <label className="block text-blue-100 font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 
                        text-white placeholder-blue-200/50 outline-none transition-all duration-300"
                      placeholder="How can we help?"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="md:col-span-2">
                    <label className="block text-blue-100 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 
                        text-white placeholder-blue-200/50 outline-none transition-all duration-300 resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="md:col-span-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
                        text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Send Message</span>
                      <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] 
                        transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.form>

              {/* Contact Information */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="mt-16 grid md:grid-cols-3 gap-8"
              >
                {[
                  { icon: "📧", title: "Email", info: "contact@thewings.com", gradient: "from-blue-400 to-cyan-400" },
                  { icon: "📞", title: "Phone", info: "(555) 123-4567", gradient: "from-purple-400 to-pink-400" },
                  { icon: "📍", title: "Address", info: "123 Tech Street, Digital City", gradient: "from-orange-400 to-red-400" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 
                      hover:border-white/20 group text-center"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${item.gradient} text-transparent bg-clip-text`}>
                      {item.title}
                    </h3>
                    <p className="text-blue-100 group-hover:text-white transition-colors">{item.info}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 