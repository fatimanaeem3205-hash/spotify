import React, { useEffect } from 'react';
import imgabout from '../assets/bgabout.jpg'

export default function About() {
  // Automatically snap window posture to the absolute top coordinates upon component layout mounting
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: "15+", label: "Happy customers who have trusted us" },
    { value: "99%", label: "Customer approval rate for our value" },
    { value: "5,000+", label: "Trusted by the world's absolute best clients" },
    { value: "24/7", label: "Our dedicated support team is available" }
  ];

  const values = [
    { title: "Customer Focus", desc: "We put our customers at the heart of everything we do. Your satisfaction is our top priority, and we strive to exceed your expectations in every car rental experience." },
    { title: "Integrity", desc: "Honesty and transparency are the foundations of our business. We believe in building trust through clear communication and fair pricing without hidden fees." },
    { title: "Reliability", desc: "Our customers rely on us for safe and dependable transportation. We maintain our vehicles to the highest standards to ensure you have a worry-free journey." },
    { title: "Innovation", desc: "We are continuously looking for ways to enhance our services and embrace new technologies to make vehicle rental easier and more convenient for everyone." },
    { title: "Sustainability", desc: "We are committed to reducing our environmental impact. Our fleet includes eco-friendly vehicles, and we promote responsible driving practices to protect our planet." }
  ];

  return (
    <div className="bg-white text-neutral-900 overflow-x-hidden antialiased font-sans">
      
      {/* 1. TOP INTRO SECTION */}
      <section className="pt-20 pb-12 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
          Who we are
        </h1>
        <p className="text-sm md:text-base text-neutral-600 font-medium leading-relaxed max-w-3xl mx-auto">
          Founded with a passion for making city travel easy and accessible, we have grown to become a trusted car rental service in the area. Our mission is to provide convenient and affordable transportation options for every occasion, from daily commutes to special events. With a fleet of diverse vehicles and a deep commitment to customer satisfaction, we strive to make every rental experience smooth and enjoyable.
        </p>
      </section>

      {/* 2. STATS OVERVIEW MATRIX */}
      <section className="py-6 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-b border-gray-100 py-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2 border-l border-yellow-400 pl-4">
              <p className="text-4xl font-bold text-neutral-900 tracking-tight">{stat.value}</p>
              <p className="text-xs font-semibold text-neutral-500 leading-snug max-w-[180px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HERO SHOWROOM BANNER */}
      <section className="py-8 w-full mx-0 px-0">
        <div className="w-full h-[350px] md:h-[500px] overflow-hidden shadow-sm">
          <img 
            src={imgabout} 
            alt="Premium Fleet Showroom View" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 4. CONTENT & IMAGE SPLIT MOSAIC SYSTEM */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Text Foundations */}
        <div className="lg:col-span-6 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Our mission</h2>
            <p className="text-sm font-medium text-neutral-600 leading-relaxed">
              Our mission is to provide exceptional car rental services that make travel customized, affordable, and stress-free. We aim to create a seamless experience by offering a diverse fleet of vehicles, flexible options, and outstanding customer support. We are committed to being your trusted partner on the road, ensuring every journey is smooth, sustainable, and tailored to your needs.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Our values</h2>
            <ul className="space-y-4 text-sm font-medium text-neutral-600">
              {values.map((v, idx) => (
                <li key={idx} className="leading-relaxed">
                  <strong className="text-neutral-900 font-bold">{v.title}: </strong>
                  {v.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Masonry Graphic Montage */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-4">
          <div className="col-span-5 space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80" 
              alt="Fleet Details" 
              className="w-full h-32 object-cover rounded-xl shadow-sm"
            />
            <img 
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&h=500&q=80" 
              alt="Premium Delivery" 
              className="w-full h-64 object-cover rounded-xl shadow-sm"
            />
          </div>
          <div className="col-span-7 pt-8">
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&h=600&q=80" 
              alt="Showroom Engagement" 
              className="w-full h-[336px] object-cover rounded-xl shadow-sm"
            />
          </div>
          <div className="col-span-12 -mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <img 
                src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=500&q=80" 
                alt="Track Diagnostics" 
                className="w-full h-44 object-cover rounded-xl shadow-sm"
              />
            </div>
            <div className="col-span-5">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80" 
                alt="Client Consultation" 
                className="w-full h-44 object-cover rounded-xl shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}