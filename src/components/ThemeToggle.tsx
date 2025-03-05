import React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useThemeStore } from '../store/theme';

const themes = [
  { name: 'light', icon: Sun },
  { name: 'dark', icon: Moon },
  { name: 'serika-dark', icon: Palette },
  { name: 'botanical', icon: Palette },
  { name: 'muted', icon: Palette },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {theme === 'light' ? <Sun /> : theme === 'dark' ? <Moon /> : <Palette />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {themes.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={`${
                  theme === name ? 'bg-gray-100 dark:bg-gray-700' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                onClick={() => {
                  setTheme(name);
                  setIsOpen(false);
                }}
              >
                <Icon className="w-4 h-4 mr-2" />
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}