import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Branch Metadata column text */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brandTextMuted">Support Desks Open 24/7</span>
            <h1 className="text-3xl md:text-4xl font-light text-brandDark mt-1">Get In Touch</h1>
          </div>
          <p className="text-brandTextMuted text-sm leading-relaxed">
            Have specialized collection requests or long-term multi-city European travel itineraries? Reach out to our hospitality desk below.
          </p>
          <div className="space-y-2 text-sm text-brandDark font-medium">
            <p>📍 Via Colonnello 35, Bolzano, Italy</p>
            <p>✉️ drive.exotics@renc.com</p>
            <p>📞 +39 011 43231</p>
          </div>
        </div>

        {/* Input Form submission card box */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-brandTextMuted mb-1">Your Full Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 text-sm p-2.5 rounded-xl focus:outline-none focus:border-brandDark" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-brandTextMuted mb-1">Email Address</label>
              <input type="email" required placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 text-sm p-2.5 rounded-xl focus:outline-none focus:border-brandDark" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-brandTextMuted mb-1">Message Content</label>
              <textarea rows="4" required placeholder="Describe your destination itinerary specifics..." className="w-full bg-gray-50 border border-gray-200 text-sm p-2.5 rounded-xl focus:outline-none focus:border-brandDark"></textarea>
            </div>
            <button className="w-full bg-brandDark text-white font-bold py-3 text-sm rounded-xl hover:opacity-90 transition">
              Send Secure Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}