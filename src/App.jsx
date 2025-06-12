import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const techStack = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    proficiency: 90
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmythinkpond.com%2Fimg%2Flogo%2Ftailwindcss-logo.png&f=1&nofb=1&ipt=c20e8d5e9a2f5367426368ca615e21c4c9f74f353194cb9692cd9359b3bf0c8b",
  },
  {
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  }
];

const projects = [
  {
    name: "WrocMap",
    type: "mobile",
    description: "A comprehensive public transport tracking system including a React Native mobile app and web interface that provides real-time location data for buses in Wrocław, Poland. Features route planning, delay notifications, and vehicle tracking.",
    github: "https://github.com/real-kijmoshi/wroclaw-mpk-map",
    live: "http://34.135.168.254:3000/map",
    image: "https://raw.githubusercontent.com/real-kijmoshi/wroclaw-mpk-map/refs/heads/main/images/screen1.jpg",
    images: [
      "https://raw.githubusercontent.com/real-kijmoshi/wroclaw-mpk-map/refs/heads/main/images/screen1.jpg",
      "https://raw.githubusercontent.com/real-kijmoshi/wroclaw-mpk-map/refs/heads/main/images/screen2.jpg",
      "https://raw.githubusercontent.com/real-kijmoshi/wroclaw-mpk-map/refs/heads/main/images/screen3.jpg"
    ],
    techStack: [
      "React Native",
      "Expo",
      "Express.js",
      "Twitter API",
      "Wrocław MPK API (sadly)"
    ],
    challenges: "Integrating real-time data from multiple sources, optimizing map performance with hundreds of moving markers, and creating a seamless mobile-web experience. Also wroclaw api is poorly documented but I managed to make it work. Also fight (in progress) with apple to allow publishing the app on the App Store because of my age."
  },
  {
    name: "portfolio",
    type: "web",
    description: "My personal portfolio website showcasing my projects, skills, and experience. Built with React and Tailwind CSS, it features smooth animations, responsive design, and a clean, modern aesthetic.",
    github: "https://github.com/real-kijmoshi/portfolio",
    live: "https://kijmoshi.xyz",
    image: "https://raw.githubusercontent.com/real-kijmoshi/portfolio/refs/heads/main/screenshots/screenshot.png",
    images: [],
    techStack: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel"
    ],
    challenges: "Creating a visually appealing and responsive design, implementing smooth animations with Framer Motion, and ensuring cross-browser compatibility."
  },
  {
    name: "DreemBook",
    type: "mobile",
    description: "A dream journal application made in React Native that allows users to record, categorize, and analyze their dreams. Features include mood tracking, dream pattern recognition, and a secure private journal with rich text formatting.",
    github: "https://github.com/real-kijmoshi/dream-book",
    image: "https://raw.githubusercontent.com/real-kijmoshi/dream-book/refs/heads/main/screenshots/1.png",
    images: [
      "https://raw.githubusercontent.com/real-kijmoshi/dream-book/refs/heads/main/screenshots/1.png",
      "https://raw.githubusercontent.com/real-kijmoshi/dream-book/refs/heads/main/screenshots/2.png",
      "https://raw.githubusercontent.com/real-kijmoshi/dream-book/refs/heads/main/screenshots/3.png"
    ],
    techStack: [
      "React Native",
      "Expo",
    ],
    challenges: "Implementing a rich text editor with custom formatting options"
  }
];

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/real-kijmoshi",
    icon: <Github size={24} />,
    color: "hover:text-gray-900"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/kijmoshi_dev",
    icon: <Twitter size={24} />,
    color: "hover:text-blue-400"
  },
  {
    name: "Email",
    url: "mailto:dev@kijmoshi.xyz",
    icon: <Mail size={24} />,
    color: "hover:text-red-500"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const PhoneFrame = ({ image }) => {
  return (
    <div className="relative mx-auto w-64 h-[500px]">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-gray-900 rounded-[40px] p-2 shadow-2xl">
        {/* Screen area */}
        <div className="relative h-full w-full bg-black rounded-[32px] overflow-hidden">
          {/* Camera notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl z-10"></div>
          {/* Screen content */}
          <img 
            src={image} 
            alt="App screenshot" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Home button */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-700 rounded-full"></div>
    </div>
  );
};

export default function App() {
  const [activeImageIndex, setActiveImageIndex] = useState(projects.map(() => 0));

  const handleImageChange = (projectIndex, imageIndex) => {
    setActiveImageIndex((prev) => {
      const newActiveImages = [...prev];
      newActiveImages[projectIndex] = imageIndex;
      return newActiveImages;
    });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 font-sans scroll-smooth">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-bl-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100 rounded-tr-full opacity-20"></div>
          
          <motion.div variants={fadeIn} className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              kijmoshi
            </h1>
            <motion.span 
              variants={fadeIn}
              className="text-xl md:text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold mb-4 block"
            >
              Full Stack Developer & JavaScript Enthusiast
            </motion.span>
            
            <motion.p 
              variants={fadeIn}
              className="text-gray-700 leading-relaxed mb-6 max-w-3xl text-lg"
            >
              I build exceptional digital experiences with modern web technologies. 
              With 5+ years of experience in JavaScript ecosystem, I specialize in 
              creating performant, accessible, and visually appealing applications. 
              When I'm not coding, you'll find me bouldering.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4 mb-6"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-gray-600 ${social.color} transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50`}
                  aria-label={social.name}
                >
                  {social.icon}
                  <span className="hidden sm:inline">{social.name}</span>
                </a>
              ))}
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-200"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-semibold text-gray-800 mb-6"
          >
            My Tech Stack
          </motion.h2>
          
          <motion.p 
            variants={fadeIn}
            className="text-gray-600 mb-8 max-w-3xl"
          >
            I've worked with a wide range of technologies in the web development world.
            Here are the tools I'm most proficient with:
          </motion.p>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {techStack.map((tech) => (
              <motion.div 
                key={tech.name}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="flex flex items-center justify-center bg-white rounded-lg shadow-sm p-4 transition-transform duration-200 hover:shadow-md"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-10 h-10"
                  loading="lazy"
                />
                <span className="ml-3 text-gray-700 font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-semibold text-gray-800 mb-6"
          >
            Featured Projects
          </motion.h2>
          
          <motion.p 
            variants={fadeIn}
            className="text-gray-600 mb-8 max-w-3xl"
          >
            Here are some of my proudest creations. Each project represents unique challenges
            and innovative solutions.
          </motion.p>

          <div className="flex flex-col gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={project.name}
                variants={fadeIn}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-8 bg-gray-50 rounded-xl p-4 md:p-6`}
              >
                <div className="md:w-1/2">
                  <div className="relative rounded-lg overflow-hidden shadow-md h-64 md:h-80 flex items-center justify-center bg-gray-100">
                    {project.type === "mobile" ? (
                      <PhoneFrame image={project.images ? project.images[activeImageIndex[index]] : project.image} />
                    ) : (
                      <img 
                        src={project.images.length ? project.images[activeImageIndex[index]] : project.image}
                        alt={project.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    {project.images && (
                      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2">
                        {project.images.map((img, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => handleImageChange(index, imgIndex)}
                            className={`w-8 h-8 rounded-full border-2 ${activeImageIndex[index] === imgIndex ? 'border-indigo-600' : 'border-gray-300'} transition-colors duration-200 hover:border-indigo-500`
                            }
                            aria-label={`View image ${imgIndex + 1} of ${project.name}`}
                            title={`View image ${imgIndex + 1} of ${project.name}`}
                            style={{ backgroundColor: activeImageIndex[index] === imgIndex ? 'rgba(99, 102, 241, 0.1)' : 'transparent' }}
                          >
                            <img 
                              src={img} 
                              alt="" 
                              className="w-full h-full object-cover rounded-full"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  {project.challenges && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-1">Key Challenges:</h4>
                      <p className="text-gray-600 text-sm">{project.challenges}</p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-semibold text-gray-800 mb-6"
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeIn}
              className="md:col-span-2"
            >
              <p className="text-gray-600 mb-4">
                I'm a passionate full-stack developer with a strong focus on creating 
                intuitive and efficient web applications. My journey in programming 
                started when I was 15, and since then I've been constantly expanding 
                my knowledge and skills.
              </p>
              
              <p className="text-gray-600 mb-4">
                What drives me is the ability to solve complex problems with elegant 
                solutions. I believe in writing clean, maintainable code and following 
                best practices to ensure scalability and performance.
              </p>
              
              <p className="text-gray-600 mb-6">
                When I'm not coding, you can find me at the climbing gym working on 
                bouldering problems, which I find surprisingly similar to debugging 
                complex code - both require patience, persistence, and creative thinking.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-1">5+ Years</h4>
                  <p className="text-indigo-600 text-sm">Coding Experience</p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-1">10+ Projects</h4>
                  <p className="text-indigo-600 text-sm">Completed</p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-1">Continuous</h4>
                  <p className="text-indigo-600 text-sm">Learning & Growth</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col items-center"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-indigo-100 mb-4">
                <img 
                  src="/image.jpg"
                  alt="Kijmoshi" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-800">kijmoshi</h4>
                <p className="text-gray-600 text-sm">Full Stack Developer</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-semibold text-gray-800 mb-6"
          >
            Get In Touch
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              variants={fadeIn}
            >
              <p className="text-gray-600 mb-6">
                Have a project in mind or want to discuss potential opportunities? 
                I'm always open to interesting collaborations and conversations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-indigo-600" size={24} />
                  <div>
                    <h4 className="font-medium text-gray-700">Email</h4>
                    <a href="mailto:dev@kijmoshi.xyz" className="text-indigo-600 hover:underline">
                      dev@kijmoshi.xyz
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Github className="text-indigo-600" size={24} />
                  <div>
                    <h4 className="font-medium text-gray-700">GitHub</h4>
                    <a 
                      href="https://github.com/real-kijmoshi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      github.com/real-kijmoshi
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.form 
              variants={fadeIn}
              className="space-y-4"
              method="POST"
              action="https://formspree.io/f/xyzjwnog"
            >
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </motion.section>

        <footer className="text-center text-gray-500 text-sm py-6">
          <p>© {new Date().getFullYear()} kijmoshi. All rights reserved.</p>
          <p className="mt-1">Built with React, Tailwind CSS, and Framer Motion</p>
        </footer>
      </div>
    </div>
  );
}