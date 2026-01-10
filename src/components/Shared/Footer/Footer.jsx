import { Link } from 'react-router'
import logo from '../../../assets/images/logo.png'
import { FaXTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t border-base-300 pt-16 pb-8 text-neutral-content">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">

          {/* Brand & Mission - 4 Columns */}
          <div className="lg:col-span-4 space-y-6">
            <Link to='/' className="flex items-center space-x-3 group">
              <img
                className='w-12 h-12 rounded-2xl ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300'
                src={logo}
                alt="LessonsVerse Logo"
              />
              <span className="text-2xl font-black text-neutral tracking-tight">
                Lessons<span className="text-primary">Verse</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Empowering individuals to capture life's hard-won wisdom. Join our community to share, learn, and grow through collective experiences.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <FaFacebook />, link: "https://www.facebook.com/mdlimon.islam.1422409", label: "Facebook" },
                { icon: <FaXTwitter />, link: "https://x.com/", label: "Twitter" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/limon-dev/", label: "LinkedIn" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/", label: "Instagram" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target='_blank'
                  className="p-2 bg-base-300 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - 2 Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral mb-6 italic">Platform</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Story</Link></li>
              <li><Link to="/public-lessons" className="hover:text-primary transition-colors">Explore Lessons</Link></li>
              <li><Link to="/upgrade-premium" className="flex items-center gap-2 hover:text-primary transition-colors font-bold text-accent">
                ✨ Premium Upgrade
              </Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Support - 2 Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral mb-6 italic">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/support" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter - 4 Columns */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral mb-2 italic">Stay Inspired</h3>
            <p className="text-xs">Get weekly insights and top life lessons delivered to your inbox.</p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-base-300 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-primary transition-all outline-none"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-xs">
                <Mail size={14} className="text-primary" />
                <span>support@lessonsverse.com</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <MapPin size={14} className="text-primary" />
                <span>Dinajpur, Bangladesh</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] font-medium opacity-70">
            &copy; {currentYear} LessonsVerse. Built with ❤️ for lifelong learners.
          </p>
          <div className="flex gap-6 text-[12px] opacity-70">
            <span>Status: Operational</span>
            <span>Version: 2.0.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
