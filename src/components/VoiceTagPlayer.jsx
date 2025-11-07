import { useState, useRef, useEffect } from 'react';

/**
 * Voice Tag Audio Player Component
 * Plays voice tag demos with waveform visualization
 */
const VoiceTagPlayer = ({ demos }) => {
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

  return (
    <div className="bg-DarkLava border-2 border-gold/50 rounded-lg p-6">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={demos[currentTrack].file}
        preload="metadata"
      />

      {/* Current Track Info */}
      <div className="mb-6">
        <h3 className="font-amiamie-round text-2xl font-bold text-gold mb-2">
          {demos[currentTrack].name}
        </h3>
        <p className="font-amiamie text-sm text-SageGray">
          {demos[currentTrack].description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-2 py-1 bg-gold/20 text-gold text-xs font-amiamie-round rounded">
            {demos[currentTrack].style}
          </span>
          <span className="text-SageGray text-xs font-amiamie">
            {demos[currentTrack].type}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className="mb-4 h-2 bg-primary/20 rounded-full cursor-pointer overflow-hidden"
        onClick={handleSeek}
      >
        <div 
          className="h-full bg-gold transition-all"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-amiamie text-sm text-SageGray">
          {formatTime(currentTime)}
        </span>
        <span className="font-amiamie text-sm text-SageGray">
          {formatTime(duration)}
        </span>
      </div>

      {/* Play/Pause Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={togglePlay}
          className="w-16 h-16 bg-gold hover:bg-gold/90 rounded-full flex items-center justify-center transition-all hover:scale-105"
        >
          {isPlaying ? (
            <svg className="w-8 h-8 text-DarkLava" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-DarkLava ml-1" fill="currentColor" viewBox="0 0 20 20">
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
            className={`w-full text-left p-3 rounded transition-all ${
              currentTrack === index
                ? 'bg-gold/20 border border-gold'
                : 'bg-primary/5 border border-SageGray/30 hover:border-gold/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`font-amiamie-round font-bold ${
                  currentTrack === index ? 'text-gold' : 'text-primary'
                }`}>
                  {demo.name}
                </p>
                <p className="font-amiamie text-xs text-SageGray">
                  {demo.style} • {demo.type}
                </p>
              </div>
              {currentTrack === index && isPlaying && (
                <div className="flex gap-1 items-end h-5">
                  <div className="w-1 bg-gold animate-pulse" style={{ height: '40%' }} />
                  <div className="w-1 bg-gold animate-pulse" style={{ height: '80%', animationDelay: '0.1s' }} />
                  <div className="w-1 bg-gold animate-pulse" style={{ height: '60%', animationDelay: '0.2s' }} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-6 pt-6 border-t border-gold/30 text-center">
        <p className="font-amiamie text-sm text-SageGray mb-3">
          Like what you hear? Get your own custom voice tag!
        </p>
        <a
          href="https://www.fiverr.com/solufelo/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-gold text-DarkLava font-amiamie-round font-bold rounded hover:bg-gold/90 transition"
        >
          Order Now on Fiverr
        </a>
      </div>
    </div>
  );
};

export default VoiceTagPlayer;

