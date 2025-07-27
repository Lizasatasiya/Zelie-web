import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroBg from '../assets/hero-bg.png'; // Make sure the image exists here

const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Background overlay for contrast */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center justify-center space-y-10 mt-10">
        <h1 className="text-6xl md:text-8xl font-extralight text-gray-900 tracking-widest">
          ZELIE
        </h1>

        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-light text-gray-600 tracking-wide max-w-2xl mx-auto leading-relaxed">
            Exquisite jewelry for every moment
          </p>
          <div className="w-24 h-px bg-[#503e28] mx-auto"></div>
          <p className="text-base md:text-lg font-light text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Discover our handcrafted collection where timeless elegance meets modern sophistication
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
          <button
            onClick={() => {
              const section = document.getElementById('products');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group bg-[#503e28] text-white px-8 py-4 font-light tracking-wide hover:bg-[#3d2f1f] transition-all duration-300 flex items-center space-x-3"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Ticker */}
      <div className="w-full bg-[#f3eee8] py-3 overflow-hidden mt-12 shadow-inner z-20">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-6 font-semibold text-sm text-[#503e28]">WATERPROOF</span>
              <span className="mx-6 font-semibold text-sm text-[#503e28]">ANTI-TARNISH</span>
              <span className="mx-6 font-semibold text-sm text-[#503e28]">SKIN-FRIENDLY</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
