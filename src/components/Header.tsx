import React from 'react';

export default function Header() {
  return (
    <header className="h-16 border-b border-zinc-200 bg-white flex items-center px-6 justify-between">
      <h1 className="text-lg font-semibold">HVN POS King</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-500">Admin</span>
      </div>
    </header>
  );
}
