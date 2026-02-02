import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Pause, Play, Sparkles, X } from 'lucide-react';

// Floating Heart Component
const FloatingHeart = ({ delay, duration, size, left, animationType }: { 
  delay: number; 
  duration: number; 
  size: number; 
  left: string;
  animationType: string;
}) => {
  
  return (
    <div
      className="floating-heart"
      style={{
        left,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: size,
        height: size,
      }}
    >
      <Heart 
        className="w-full h-full text-valentine-pink/40" 
        fill="currentColor"
        style={{
          animation: animationType === 'left' ? `floatUpLeft ${duration}s linear infinite` :
                    animationType === 'right' ? `floatUpRight ${duration}s linear infinite` :
                    `floatUp ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
};

// Floating Hearts Background
const FloatingHeartsBackground = () => {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 15,
    duration: 8 + Math.random() * 10,
    size: 15 + Math.random() * 30,
    left: `${Math.random() * 100}%`,
    animationType: Math.random() > 0.6 ? 'left' : Math.random() > 0.3 ? 'right' : 'up',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {hearts.map((heart) => (
        <FloatingHeart key={heart.id} {...heart} />
      ))}
    </div>
  );
};

// Glow Orbs Background
const GlowOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        className="glow-orb"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,182,193,0.4) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
          animationDelay: '0s',
        }}
      />
      <div 
        className="glow-orb"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,228,233,0.5) 0%, transparent 70%)',
          top: '60%',
          right: '15%',
          animationDelay: '3s',
        }}
      />
      <div 
        className="glow-orb"
        style={{
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255,221,228,0.4) 0%, transparent 70%)',
          bottom: '20%',
          left: '30%',
          animationDelay: '6s',
        }}
      />
      <div 
        className="glow-orb"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255,245,245,0.3) 0%, transparent 70%)',
          top: '30%',
          right: '5%',
          animationDelay: '9s',
        }}
      />
    </div>
  );
};

// Hero Section
const HeroSection = ({ onYesClick, setMusicPlaying }: { 
  onYesClick: () => void; 
  setMusicPlaying: (playing: boolean) => void;
}) => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 400);
    const buttonsTimer = setTimeout(() => setButtonsVisible(true), 1000);
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  const handleNoButtonHover = useCallback(() => {
    if (noButtonRef.current) {
      const button = noButtonRef.current;
      const maxX = window.innerWidth - button.offsetWidth - 100;
      const maxY = window.innerHeight - button.offsetHeight - 100;
      const randomX = Math.random() * maxX - maxX / 2;
      const randomY = Math.random() * maxY - maxY / 2;
      button.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
  }, []);

  const handleYesClick = () => {
    setMusicPlaying(true);
    onYesClick();
  };

  const titleWords = ["Will", "you", "be", "my", "Valentine?"];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4">
      <div className="text-center">
        {/* Animated Title */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-4">
          {titleWords.map((word, index) => (
            <span
              key={index}
              className={`inline-block mx-2 transition-all duration-700 ${
                titleVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {word === "Valentine?" ? (
                <span className="text-valentine-red relative">
                  {word}
                  <Heart 
                    className="absolute -top-6 -right-6 w-8 h-8 text-valentine-heart animate-heart-beat" 
                    fill="currentColor"
                  />
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p 
          className={`font-script text-2xl sm:text-3xl text-valentine-rose mb-12 transition-all duration-700 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          I've been waiting to ask you this...
        </p>

        {/* Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-600 ${
            buttonsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          {/* Yes Button */}
          <button
            onClick={handleYesClick}
            className="btn-yes group relative px-12 py-5 bg-gradient-to-r from-valentine-red to-[#FF8E8E] text-white font-semibold text-xl rounded-full shadow-valentine hover:shadow-valentine-lg flex items-center gap-3"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            <span>Yes</span>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-valentine-gold opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* No Button */}
          <button
            ref={noButtonRef}
            onMouseEnter={handleNoButtonHover}
            className="btn-no px-12 py-5 bg-transparent border-2 border-valentine-pink text-valentine-rose font-medium text-xl rounded-full hover:bg-valentine-cream flex items-center gap-3"
          >
            <span>No</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// Memory Carousel Section
const MemorySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const images = [
    { src: '/img1.jpg', alt: 'Sunset beach moment' },
    { src: '/img2.jpg', alt: 'Coffee date' },
    { src: '/img3.jpg', alt: 'Flower field walk' },
    { src: '/img4.jpg', alt: 'Candlelit dinner' },
    { src: '/img5.jpg', alt: 'Stargazing night' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative z-10"
    >
      <div 
        className={`text-center mb-12 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Our <span className="text-valentine-red">Memories</span>
        </h2>
        <p className="font-body text-lg text-gray-600 max-w-xl mx-auto">
          Every moment with you is a treasure I hold close to my heart
        </p>
      </div>

      {/* Carousel */}
      <div 
        className={`relative w-full max-w-4xl mx-auto transition-all duration-800 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-800 ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-valentine-red w-8'
                  : 'bg-valentine-pink/50 hover:bg-valentine-pink'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Love Message Section
const LoveMessageSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setTextRevealed(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const message = "From the moment I met you, my world changed forever. Your smile brightens my darkest days, your laughter is the melody my heart dances to, and your love is the greatest gift I've ever received. Every second spent with you feels like a beautiful dream I never want to wake up from. You're my best friend, my soulmate, my everything. This Valentine's Day, I want you to know that my love for you grows stronger with each passing moment. Will you make me the happiest person alive and be my Valentine?";

  const words = message.split(' ');

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div 
          className={`mb-8 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Heart 
            className="w-16 h-16 text-valentine-red mx-auto animate-heart-beat" 
            fill="currentColor"
          />
        </div>

        <h2 
          className={`font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-12 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          My Love <span className="text-valentine-red">For You</span>
        </h2>

        <div 
          className={`font-body text-lg sm:text-xl leading-relaxed text-gray-700 transition-all duration-800 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block mr-[0.3em] transition-all duration-50 ${
                textRevealed 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-2'
              }`}
              style={{ 
                transitionDelay: `${index * 30}ms`,
                transitionTimingFunction: 'ease-out'
              }}
            >
              {word}
            </span>
          ))}
          {textRevealed && (
            <span className="inline-block w-0.5 h-6 bg-valentine-red ml-1 animate-pulse" />
          )}
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="w-6 h-6 text-valentine-pink"
              fill="currentColor"
              style={{
                animation: `float 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Success Popup
const SuccessPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; left: string; delay: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      const colors = ['#FF6B6B', '#FFB6C1', '#FFD700', '#FF4757', '#E8A4B8'];
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
      }));
      setConfetti(newConfetti);

      // Clear confetti after animation
      setTimeout(() => setConfetti([]), 5000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti"
          style={{
            backgroundColor: c.color,
            left: c.left,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      {/* Popup Content */}
      <div className="popup-animate relative bg-white rounded-3xl p-8 sm:p-12 max-w-lg mx-4 text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <div className="mb-6">
          <Heart 
            className="w-20 h-20 text-valentine-red mx-auto animate-heart-beat" 
            fill="currentColor"
          />
        </div>

        <h3 className="font-display text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Yayyyy <span className="text-valentine-red">❤️</span>
        </h3>

        <p className="font-script text-2xl text-valentine-rose mb-2">
          I knew it!
        </p>

        <p className="font-body text-lg text-gray-600">
          Let's Get The Valentine Started <span className="text-2xl">🥰</span>
        </p>

        <div className="mt-8 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Sparkles
              key={i}
              className="w-6 h-6 text-valentine-gold"
              style={{
                animation: `sparkle 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Music Player Button
const MusicPlayer = ({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) => {
  return (
    <button
      onClick={onToggle}
      className="music-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-valentine-pink to-valentine-rose text-white shadow-lg flex items-center justify-center hover:shadow-valentine"
    >
      {isPlaying ? (
        <Pause className="w-6 h-6" />
      ) : (
        <Play className="w-6 h-6 ml-0.5" />
      )}
      {isPlaying && (
        <div className="absolute inset-0 rounded-full animate-pulse-glow" />
      )}
    </button>
  );
};

// Main App
function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/Easy (Jeje).mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, user needs to interact
          setMusicPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicPlaying]);

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="min-h-screen animated-gradient relative">
      {/* Background Effects */}
      <GlowOrbs />
      <FloatingHeartsBackground />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection 
          onYesClick={() => setShowPopup(true)} 
          setMusicPlaying={setMusicPlaying}
        />
        <MemorySection />
        <LoveMessageSection />
      </main>

      {/* Music Player */}
      <MusicPlayer isPlaying={musicPlaying} onToggle={toggleMusic} />

      {/* Success Popup */}
      <SuccessPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}

export default App;
