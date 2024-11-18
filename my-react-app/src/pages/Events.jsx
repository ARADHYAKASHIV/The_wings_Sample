import { motion } from 'framer-motion';

function Events() {
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

  const events = [
    {
      title: "Annual Tech Conference",
      date: "June 15, 2024",
      location: "Main Convention Center",
      description: "Join us for our biggest event of the year featuring keynote speakers and workshops.",
      image: "https://via.placeholder.com/400x200",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Summer Hackathon",
      date: "July 20, 2024",
      location: "Innovation Hub",
      description: "A hands-on hackathon focusing on AI and machine learning projects.",
      image: "https://via.placeholder.com/400x200",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Networking Night",
      date: "August 5, 2024",
      location: "Downtown Tech Center",
      description: "Connect with professionals and fellow members in a casual setting.",
      image: "https://via.placeholder.com/400x200",
      gradient: "from-orange-500 to-red-500"
    }
  ];

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
                Upcoming Events
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="backdrop-blur-md bg-white/5 rounded-2xl overflow-hidden border border-white/10 
                    hover:border-white/20 group transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-20`}></div>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-transparent 
                      group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300">
                      {event.title}
                    </h3>
                    <div className="text-blue-100 mb-4 space-y-1">
                      <p className="flex items-center">
                        <span className="mr-2">📅</span> {event.date}
                      </p>
                      <p className="flex items-center">
                        <span className="mr-2">📍</span> {event.location}
                      </p>
                    </div>
                    <p className="text-gray-300 mb-6">{event.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full px-4 py-2 rounded-xl bg-gradient-to-r ${event.gradient} 
                        text-white font-semibold hover:shadow-lg relative overflow-hidden group`}
                    >
                      <span className="relative z-10">Register Now</span>
                      <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] 
                        transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events; 