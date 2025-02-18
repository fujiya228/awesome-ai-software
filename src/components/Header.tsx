import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 relative">
      <div className="container mx-auto flex items-center justify-end">
        <nav>
          <a href="https://github.com/fujiya228/awesome-ai-software" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaGithub size={32} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
