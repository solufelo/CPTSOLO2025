import { Icon } from '@iconify/react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { useState } from 'react';

/**
 * ThemeSwitch Component
 * A sleek, animated theme toggle with dropdown for selection
 */
const ThemeSwitch = () => {
  const { theme, setTheme, cycleTheme, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Theme-aware styling
  const getButtonStyles = () => {
    switch(theme) {
      case 'glass':
        return 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 hover:border-cyan-400/50';
      case 'light':
        return 'bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-400/50';
      default:
        return 'bg-black/80 border-gold/30 hover:bg-black hover:border-gold/50';
    }
  };

  const getIconColor = () => {
    switch(theme) {
      case 'glass':
        return 'text-cyan-400';
      case 'light':
        return 'text-blue-600';
      default:
        return 'text-gold';
    }
  };

  const getDropdownStyles = () => {
    switch(theme) {
      case 'glass':
        return 'bg-[#0f0f1a]/95 backdrop-blur-xl border-white/20';
      case 'light':
        return 'bg-white border-gray-200 shadow-xl';
      default:
        return 'bg-[#1a1a1a]/95 backdrop-blur-xl border-gold/30';
    }
  };

  return (
    <div className="relative">
      {/* Main toggle button */}
      <button
        onClick={cycleTheme}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full
                   border transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${getButtonStyles()}`}
        title={`Current: ${themeConfig.name} (click to cycle, right-click for menu)`}
        aria-label="Toggle theme"
      >
        <Icon 
          icon={themeConfig.icon} 
          className={`w-5 h-5 transition-transform duration-500 group-hover:rotate-180 ${getIconColor()}`} 
        />
        
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10 ${
          theme === 'glass' ? 'bg-cyan-400/20' : theme === 'light' ? 'bg-blue-400/20' : 'bg-gold/20'
        }`} />
      </button>

      {/* Dropdown menu (shows on right-click) */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className={`absolute right-0 top-14 z-50 min-w-[220px] p-2 rounded-xl
                          border shadow-2xl animate-fade-in ${getDropdownStyles()}`}>
            <div className={`text-xs uppercase tracking-wider px-3 py-2 font-medium ${
              theme === 'light' ? 'text-gray-500' : 'text-white/50'
            }`}>
              Select Theme
            </div>
            
            {Object.values(THEMES).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                           ${theme === t.id 
                             ? theme === 'light' 
                               ? 'bg-blue-50 text-blue-600' 
                               : theme === 'glass'
                               ? 'bg-cyan-400/20 text-cyan-400'
                               : 'bg-gold/20 text-gold'
                             : theme === 'light'
                             ? 'text-gray-700 hover:bg-gray-100'
                             : 'text-white/80 hover:bg-white/10'
                           }`}
              >
                <Icon 
                  icon={t.icon} 
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    theme === t.id 
                      ? '' 
                      : theme === 'light' ? 'text-gray-400' : 'text-white/40'
                  }`}
                />
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">{t.name}</span>
                  <span className={`text-xs ${theme === 'light' ? 'text-gray-400' : 'text-white/40'}`}>
                    {t.description}
                  </span>
                </div>
                {theme === t.id && (
                  <Icon icon="mdi:check" className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitch;

