import React from 'react';
import { Globe, BookOpen, ShieldCheck, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-[#070A12] mt-12 py-8 font-mono text-xs text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 font-bold">🍪 CookieTerminal</span>
          <span>•</span>
          <span>Open-Source SVM cApp</span>
          <span>•</span>
          <span className="text-emerald-400">Powered by cookie-mcp</span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-gray-400">
          <a
            href="https://docs.cookiechain.wtf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 flex items-center gap-1 transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Docs</span>
          </a>
          <a
            href="https://cookiescan.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 flex items-center gap-1 transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Explorer</span>
          </a>
          <a
            href="https://nightly.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 flex items-center gap-1 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Nightly Wallet</span>
          </a>
          <a
            href="https://github.com/Moyu-Dev16/cookie-terminal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 flex items-center gap-1 transition"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
