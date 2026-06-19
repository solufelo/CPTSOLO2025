import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Voice Tag Audio Player Component
 * Plays voice tag demos with waveform visualization
 */
const VoiceTagPlayer = ({ demos }) => {
  const { theme } = useTheme();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (index) => {
    const audio = audioRef.current;
    const wasPlaying = isPlaying;
    
    audio.pause();
    setCurrentTrack(index);
    setIsPlaying(false);
    setCurrentTime(0);
    
    // Wait for audio to load new source
    setTimeout(() => {
      if (wasPlaying) {
        audio.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * duration;
  };

  // Theme-aware styles
  const getContainerClass = () => {
    switch(theme) {
      case 'glass':
        return 'bg-white/5 border-2 border-cyan-400/50';
      case 'light':
        return 'bg-white border-2 border-gray-200 shadow-lg';
      default:
        return 'bg-DarkLava border-2 border-gold/50';
    }
  };

  const getTitleColor = () => {
    switch(theme) {
      case 'glass':
        return 'text-cyan-400';
      case 'light':
        return 'text-gray-900';
      default:
        return 'text-gold';
    }
  };

  const getTextColor = () => {
    switch(theme) {
      case 'glass':
        return 'text-white/70';
      case 'light':
        return 'text-gray-600';
      default:
        return 'text-SageGray';
    }
  };

  const getBadgeClass = () => {
    switch(theme) {
      case 'glass':
        return 'bg-cyan-400/20 text-cyan-400';
      case 'light':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gold/20 text-gold';
    }
  };

  const getProgressBarBg = () => {
    switch(theme) {
      case 'glass':
        return 'bg-white/10';
      case 'light':
        return 'bg-gray-200';
      default:
        return 'bg-primary/20';
    }
  };

  const getProgressFill = () => {
    switch(theme) {
      case 'glass':
        return 'bg-cyan-400';
      case 'light':
        return 'bg-blue-600';
      default:
        return 'bg-gold';
    }
  };

  const getPlayButtonClass = () => {
    switch(theme) {
      case 'glass':
        return 'bg-cyan-400 hover:bg-cyan-300 text-black';
      case 'light':
        return 'bg-blue-600 hover:bg-blue-500 text-white';
      default:
        return 'bg-gold hover:bg-gold/90 text-DarkLava';
    }
  };

  const getTrackButtonClass = (isActive) => {
    const baseClass = 'w-full text-left p-3 rounded transition-all';
    
    if (isActive) {
      switch(theme) {
        case 'glass':
          return `${baseClass} bg-cyan-400/20 border border-cyan-400`;
        case 'light':
          return `${baseClass} bg-blue-50 border border-blue-600`;
        default:
          return `${baseClass} bg-gold/20 border border-gold`;
      }
    }
    
    switch(theme) {
      case 'glass':
        return `${baseClass} bg-white/5 border border-white/10 hover:border-cyan-400/50`;
      case 'light':
        return `${baseClass} bg-gray-50 border border-gray-200 hover:border-blue-400 hover:bg-white`;
      default:
        return `${baseClass} bg-primary/5 border border-SageGray/30 hover:border-gold/50`;
    }
  };

  const getActiveTrackTitle = (isActive) => {
    if (!isActive) {
      return theme === 'light' ? 'text-gray-700' : 'text-white/90';
    }
    switch(theme) {
      case 'glass': return 'text-cyan-400';
      case 'light': return 'text-blue-600';
      default: return 'text-gold';
    }
  };

  const getCTAButton = () => {
    switch(theme) {
      case 'glass':
        return 'bg-cyan-400 text-black hover:bg-cyan-300';
      case 'light':
        return 'bg-blue-600 text-white hover:bg-blue-500';
      default:
        return 'bg-gold text-DarkLava hover:bg-gold/90';
    }
  };

  return (
    <div className={`${getContainerClass()} rounded-lg p-6`}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={demos[currentTrack].file}
        preload="metadata"
      />

      {/* Current Track Info */}
      <div className="mb-6">
        <h3 className={`font-amiamie-round text-2xl font-bold mb-2 ${getTitleColor()}`}>
          {demos[currentTrack].name}
        </h3>
        <p className={`font-amiamie text-sm ${getTextColor()}`}>
          {demos[currentTrack].description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className={`px-2 py-1 text-xs font-amiamie-round rounded ${getBadgeClass()}`}>
            {demos[currentTrack].style}
          </span>
          <span className={`text-xs font-amiamie ${getTextColor()}`}>
            {demos[currentTrack].type}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className={`mb-4 h-2 rounded-full cursor-pointer overflow-hidden ${getProgressBarBg()}`}
        onClick={handleSeek}
      >
        <div 
          className={`h-full transition-all ${getProgressFill()}`}
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between items-center mb-4">
        <span className={`font-amiamie text-sm ${getTextColor()}`}>
          {formatTime(currentTime)}
        </span>
        <span className={`font-amiamie text-sm ${getTextColor()}`}>
          {formatTime(duration)}
        </span>
      </div>

      {/* Play/Pause Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={togglePlay}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105 ${getPlayButtonClass()}`}
        >
          {isPlaying ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4l10 6-10 6V4z" />
            </svg>
          )}
        </button>
      </div>

      {/* Track List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {demos.map((demo, index) => (
          <button
            key={index}
            onClick={() => changeTrack(index)}
            className={getTrackButtonClass(currentTrack === index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`font-amiamie-round font-bold ${getActiveTrackTitle(currentTrack === index)}`}>
                  {demo.name}
                </p>
                <p className={`font-amiamie text-xs ${getTextColor()}`}>
                  {demo.style} • {demo.type}
                </p>
              </div>
              {currentTrack === index && isPlaying && (
                <div className="flex gap-1 items-end h-5">
                  <div className={`w-1 animate-pulse ${getProgressFill()}`} style={{ height: '40%' }} />
                  <div className={`w-1 animate-pulse ${getProgressFill()}`} style={{ height: '80%', animationDelay: '0.1s' }} />
                  <div className={`w-1 animate-pulse ${getProgressFill()}`} style={{ height: '60%', animationDelay: '0.2s' }} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Call to Action */}
      <div className={`mt-6 pt-6 border-t text-center ${
        theme === 'light' ? 'border-gray-200' : theme === 'glass' ? 'border-white/10' : 'border-gold/30'
      }`}>
        <p className={`font-amiamie text-sm mb-3 ${getTextColor()}`}>
          Like what you hear? Get your own custom voice tag!
        </p>
        <a
          href="https://www.fiverr.com/solufelo/"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block px-6 py-3 font-amiamie-round font-bold rounded transition ${getCTAButton()}`}
        >
          Order Now on Fiverr
        </a>
      </div>
    </div>
  );
};

export default VoiceTagPlayer;