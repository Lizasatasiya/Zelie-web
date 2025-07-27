import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-extralight text-[#503e28] mb-6 tracking-[0.2em]">ZELIE</h3>
            <p className="text-gray-600 mb-8 font-light leading-relaxed max-w-md">
              Crafting exquisite jewelry pieces that celebrate life's precious moments with timeless elegance and unmatched quality.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/wearzelie?igsh=cjdkc21wbXF4YTk0" className="text-gray-400 hover:text-[#503e28] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/share/1Aywt4MEgL/" className="text-gray-400 hover:text-[#503e28] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-light text-gray-900 mb-6 tracking-wide">Shop</h4>
            <ul className="space-y-4 text-gray-600 font-light">
              {/* <li><a href="#" className="hover:text-[#503e28] transition-colors">Rings</a></li> */}
              <li><a href="#" className="hover:text-[#503e28] transition-colors">Necklaces</a></li>
              {/* <li><a href="#" className="hover:text-[#503e28] transition-colors">Earrings</a></li> */}
              {/* <li><a href="#" className="hover:text-[#503e28] transition-colors">Bracelets</a></li> */}
              {/* <li><a href="#" className="hover:text-[#503e28] transition-colors">Collections</a></li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-light text-gray-900 mb-6 tracking-wide">Contact</h4>
            <div className="space-y-4 text-gray-600 font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span className="text-sm">Gandhinagar<br />Gujarat</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+91 7984194161</span>
                <span className="text-sm">+91 6351026516</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">wearzelie1102@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-light">
            © 2024 Zelie Jewelry. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#503e28] text-sm font-light transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-[#503e28] text-sm font-light transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;