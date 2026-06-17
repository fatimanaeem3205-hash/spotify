import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brandDark text-white pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-800 pb-12">
        
        {/* Branch 1 */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest mb-4">renc<span className="text-brandPeach">●</span></h2>
          <p className="text-brandTextMuted text-sm leading-relaxed">
            Via Colonnello 35,<br /> Bolzano, AltoAdige, 39100, Italy
          </p>
          <p className="text-sm text-brandPeach mt-4">+39 011 43231</p>
        </div>

        {/* Branch 2 */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-brandPeach mb-4 uppercase">For Renters</h3>
          <ul className="space-y-2 text-sm text-brandTextMuted">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">How it works</li>
            <li className="hover:text-white cursor-pointer">Our fleet</li>
            <li className="hover:text-white cursor-pointer">Locations</li>
          </ul>
        </div>

        {/* Branch 3 */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-brandPeach mb-4 uppercase">Resources</h3>
          <ul className="space-y-2 text-sm text-brandTextMuted">
            <li className="hover:text-white cursor-pointer">Media & Blog</li>
            <li className="hover:text-white cursor-pointer">Partnerships</li>
            <li className="hover:text-white cursor-pointer">Privacy policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Branch 4 - Form */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white mb-2">Subscribe to get 20% off</h3>
          <p className="text-xs text-brandTextMuted mb-4">Receive priority access updates and season promotions.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input 
              type="email" 
              placeholder="Your email Address" 
              className="bg-zinc-900 border border-zinc-800 text-sm px-3 py-2 w-full text-white focus:outline-none focus:border-brandPeach rounded-l"
            />
            <button className="bg-brandPeach text-brandDark font-bold px-4 py-2 text-sm rounded-r hover:bg-opacity-90 transition">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-brandTextMuted gap-4">
        <p>© 2026 Renc LLC. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Facebook</span>
          <span>Instagram</span>
          <span>LinkedIn</span>
        </div>
      </div>
    </footer>
  );
}