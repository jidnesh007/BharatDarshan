import React from 'react';

const Time = ({ imagePath }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${imagePath || './images/tm4.png'})`,
          filter: 'brightness(0.85) contrast(1.1)',
          backgroundSize: 'cover',
        }}
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      
      {/* Vintage Paper Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/10 via-transparent to-amber-100/5" />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6">
        <div className="w-full max-w-full sm:max-w-2xl mx-auto sm:ml-8 md:ml-12 lg:ml-16">
          {/* Decorative Border with Soft Moving Animation */}
          <div className="relative">
            <div className="absolute -inset-3 sm:-inset-4 border-2 border-amber-300/30 rounded-lg animate-float-slow"></div>
            <div className="absolute -inset-3 sm:-inset-4 border border-amber-200/20 rounded-lg animate-float-medium"></div>
            
            {/* Soft Glow Animation */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-amber-300/10 via-yellow-200/5 to-amber-300/10 rounded-xl blur-sm animate-float-glow"></div>
            
            {/* Main Text Container */}
            <div className="relative bg-gradient-to-br from-amber-50/90 via-amber-100/80 to-yellow-50/85 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl border border-amber-200/50 transform transition-all duration-1000 hover:scale-100 sm:hover:scale-105 hover:shadow-amber-200/30 hover:shadow-3xl">
              {/* Ornamental Top Border */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse duration-2000"></div>
              </div>
              
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-900 bg-clip-text text-transparent drop-shadow-sm">
                  Time-Travel Mode:
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl lg:text-3xl text-amber-900/90 font-medium leading-relaxed">
                Reimagine what the place looked like{' '}
                <span className="font-bold text-amber-800 relative">
                  200 years ago
                  <div className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transform scale-x-0 animate-pulse"></div>
                </span>
                {' '}using{' '}
                <span className="font-semibold bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
                  AI + graphics
                </span>
                .
              </p>
              
              {/* Ornamental Bottom Border */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse duration-2500 delay-500"></div>
              </div>
            </div>
          </div>
          
          {/* Floating Accent Elements with Enhanced Animation */}
          <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-2 sm:w-3 h-2 sm:h-3 bg-amber-400 rounded-full opacity-60 animate-bounce duration-3000"></div>
          <div className="absolute -bottom-4 sm:-bottom-6 -left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-500 rounded-full opacity-40 animate-bounce duration-4000 delay-1000"></div>
          <div className="absolute top-1/2 -right-6 sm:-right-8 w-1 h-1 bg-amber-300 rounded-full opacity-50 animate-bounce duration-2500 delay-500"></div>
        </div>
      </div>
      
      {/* Vintage Film Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/5 via-transparent to-amber-800/5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/5 to-yellow-50/10"></div>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0% { transform: translateY(0px) translateX(0px) rotate(1deg); }
          25% { transform: translateY(-2px) translateX(1px) rotate(1.5deg); }
          50% { transform: translateY(-3px) translateX(0px) rotate(0.5deg); }
          75% { transform: translateY(-1px) translateX(-1px) rotate(1.2deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(1deg); }
        }
        
        @keyframes float-medium {
          0% { transform: translateY(0px) translateX(0px) rotate(-1deg); }
          30% { transform: translateY(1px) translateX(-0.5px) rotate(-0.5deg); }
          60% { transform: translateY(2px) translateX(0.5px) rotate(-1.5deg); }
          90% { transform: translateY(0.5px) translateX(1px) rotate(-0.8deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(-1deg); }
        }
        
        @keyframes float-glow {
          0% { transform: translateY(0px) scale(1); opacity: 0.3; }
          33% { transform: translateY(-1px) scale(1.01); opacity: 0.5; }
          66% { transform: translateY(0.5px) scale(0.99); opacity: 0.4; }
          100% { transform: translateY(0px) scale(1); opacity: 0.3; }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite 1s;
        }
        
        .animate-float-glow {
          animation: float-glow 10s ease-in-out infinite 0.5s;
        }
      `}</style>
    </div>
  );
};

export default Time;