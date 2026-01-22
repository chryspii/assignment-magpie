'use client';

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 bg-gray-200'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex h-14 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 rounded bg-indigo-600 text-white flex items-center justify-center font-bold'>
              M
            </div>
            <span className='font-semibold text-gray-800'>
              Magpie Dashboard
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
