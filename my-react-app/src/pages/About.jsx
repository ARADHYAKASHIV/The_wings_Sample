import { motion } from 'framer-motion';

function About() {
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

  const teamMembers = {
    management: [
      {
        name: "John Doe",
        role: "President",
        image: "https://via.placeholder.com/150",
        gradient: "from-blue-400 to-cyan-400"
      },
      {
        name: "Jane Smith", 
        role: "Vice President",
        image: "https://via.placeholder.com/150",
        gradient: "from-purple-400 to-pink-400"
      },
      {
        name: "Mike Johnson",
        role: "Secretary",
        image: "https://via.placeholder.com/150", 
        gradient: "from-orange-400 to-red-400"
      },
      {
        name: "Sarah Williams",
        role: "Treasurer",
        image: "https://via.placeholder.com/150",
        gradient: "from-green-400 to-teal-400"
      }
    ],
    teamLeads: [
      {
        name: "David Chen",
        role: "Technical Lead",
        image: "https://via.placeholder.com/150",
        gradient: "from-indigo-400 to-blue-400"
      },
      {
        name: "Emily Brown",
        role: "Events Lead",
        image: "https://via.placeholder.com/150",
        gradient: "from-pink-400 to-rose-400"
      },
      {
        name: "James Wilson",
        role: "Marketing Lead", 
        image: "https://via.placeholder.com/150",
        gradient: "from-amber-400 to-orange-400"
      },
      {
        name: "Lisa Garcia",
        role: "Operations Lead",
        image: "https://via.placeholder.com/150",
        gradient: "from-emerald-400 to-green-400"
      }
    ],
    coLeads: [
      {
        name: "Ryan Taylor",
        role: "Technical Co-Lead",
        image: "https://via.placeholder.com/150",
        gradient: "from-sky-400 to-indigo-400"
      },
      {
        name: "Sophie Martin",
        role: "Events Co-Lead",
        image: "https://via.placeholder.com/150",
        gradient: "from-fuchsia-400 to-pink-400"
      },
      {
        name: "Kevin Lee",
        role: "Marketing Co-Lead",
        image: "https://via.placeholder.com/150",
        gradient: "from-yellow-400 to-amber-400"
      },
      {
        name: "Maria Rodriguez",
        role: "Operations Co-Lead",
        image: "https://via.placeholder.com/150",
        gradient: "from-lime-400 to-emerald-400"
      }
    ]
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <div className="min-h-screen text-white pt-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                text-transparent bg-clip-text">
                About The Wings
              </h1>
            </motion.div>
            
            {/* Mission Statement */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-20"
            >
              <motion.div 
                variants={fadeInUp}
                className="max-w-4xl mx-auto backdrop-blur-md bg-white/5 p-8 rounded-2xl 
                  border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 
                  text-transparent bg-clip-text">
                  Our Mission
                </h2>
                <p className="text-blue-100 leading-relaxed">
                  We are dedicated to fostering a community of passionate individuals who believe in making 
                  a positive impact. Our club brings together people from all walks of life to share ideas, 
                  collaborate on projects, and create meaningful change.
                </p>
              </motion.div>
            </motion.section>

            {/* Team Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 
                to-pink-400 text-transparent bg-clip-text">
                Our Team
              </h2>

              {/* Management Section */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 
                  text-transparent bg-clip-text">
                  Management Heads
                </h3>
                <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {teamMembers.management.map((member, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -10 }}
                      className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 
                        hover:border-white/20 group transition-all duration-300"
                    >
                      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden 
                        group-hover:scale-105 transition-transform duration-300">
                        <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-20`}></div>
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-center text-white group-hover:text-transparent 
                        group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300">
                        {member.name}
                      </h3>
                      <p className={`text-center bg-gradient-to-r ${member.gradient} text-transparent bg-clip-text`}>
                        {member.role}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Team Leads Section */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 
                  text-transparent bg-clip-text">
                  Team Leads
                </h3>
                <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {teamMembers.teamLeads.map((member, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -10 }}
                      className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 
                        hover:border-white/20 group transition-all duration-300"
                    >
                      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden 
                        group-hover:scale-105 transition-transform duration-300">
                        <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-20`}></div>
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-center text-white group-hover:text-transparent 
                        group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300">
                        {member.name}
                      </h3>
                      <p className={`text-center bg-gradient-to-r ${member.gradient} text-transparent bg-clip-text`}>
                        {member.role}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Co-Leads Section */}
              <div>
                <h3 className="text-2xl font-semibold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 
                  text-transparent bg-clip-text">
                  Co-Leaders
                </h3>
                <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {teamMembers.coLeads.map((member, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -10 }}
                      className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 
                        hover:border-white/20 group transition-all duration-300"
                    >
                      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden 
                        group-hover:scale-105 transition-transform duration-300">
                        <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-20`}></div>
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-center text-white group-hover:text-transparent 
                        group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300">
                        {member.name}
                      </h3>
                      <p className={`text-center bg-gradient-to-r ${member.gradient} text-transparent bg-clip-text`}>
                        {member.role}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Values Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 
                to-pink-400 text-transparent bg-clip-text">
                Our Values
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Innovation",
                    description: "Pushing boundaries and exploring new possibilities",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    title: "Collaboration",
                    description: "Working together to achieve greater goals",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    title: "Excellence",
                    description: "Striving for the highest standards in everything we do",
                    gradient: "from-orange-500 to-red-500"
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className={`backdrop-blur-md bg-gradient-to-br ${value.gradient} bg-opacity-10 p-6 rounded-2xl 
                      border border-white/10 hover:border-white/20 group cursor-pointer`}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-transparent 
                      group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300">
                      {value.title}
                    </h3>
                    <p className="text-blue-100">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;