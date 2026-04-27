import React from 'react';
import { Wrench, CarFront, CheckCircle2, Building2, Car, Zap, Award } from 'lucide-react';

const AuthLayout = ({ children, variant = 'customer' }) => {
  const content = {
    customer: {
      icon: <CarFront size={80} strokeWidth={1.5} />,
      title: <>Start Your<br />AutoParts Pro<br />Journey</>,
      description: "Join 5,000+ vehicle owners who trust us for genuine parts and expert service across Nepal.",
      features: [
        { text: "Free account — no hidden charges", icon: <CheckCircle2 size={18} className="text-slate-400" /> },
        { text: "Loyalty rewards from your first purchase", icon: <CheckCircle2 size={18} className="text-slate-400" /> },
        { text: "AI-powered vehicle health monitoring", icon: <CheckCircle2 size={18} className="text-slate-400" /> }
      ],
      testimonial: {
        quote: "\"AutoParts Pro saved my car from a battery failure I didn't even know was coming.\"",
        author: "Sita Sharma, Kathmandu"
      }
    },
    staff: {
      icon: <Building2 size={80} strokeWidth={1.5} />,
      title: <>Join the<br />AutoParts Pro<br />Team</>,
      description: "Manage inventory, process sales, and serve customers through our powerful staff platform.",
      features: [
        { text: "Role-based access and permissions", icon: <CheckCircle2 size={18} className="text-slate-400" /> },
        { text: "Real-time inventory management tools", icon: <CheckCircle2 size={18} className="text-slate-400" /> },
        { text: "Sales, invoicing and reporting dashboards", icon: <CheckCircle2 size={18} className="text-slate-400" /> }
      ],
      testimonial: {
        quote: "\"The staff portal makes managing hundreds of parts and customers effortless every day.\"",
        author: "Bikram Shrestha, Senior Staff"
      }
    },
    login: {
      icon: <Car size={80} strokeWidth={1.5} />,
      title: <>Welcome back to<br />AutoParts Pro</>,
      description: "Nepal's #1 vehicle parts and service platform. Genuine parts, AI diagnostics, seamless bookings.",
      features: [
        { text: "10,000+ Genuine Parts", icon: <CheckCircle2 size={18} className="text-slate-400" /> },
        { text: "AI Vehicle Health Diagnostics", icon: <Zap size={18} className="text-slate-400" /> },
        { text: "Loyalty Rewards Program", icon: <Award size={18} className="text-slate-400" /> }
      ],
      footerText: "Trusted by 5,000+ vehicle owners across Nepal"
    }
  };

  const currentContent = content[variant];

  return (
    <div className="min-h-screen flex font-sans text-slate-800 bg-white">
      {/* Shared Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#0F172A] p-12 flex-col relative text-white">
        <div className="flex items-center gap-2 font-bold text-xl mb-16">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#0F172A]">
            <Wrench size={18} />
          </div>
          AutoPartsPro
        </div>

        <div className="bg-[#1E293B] rounded-2xl h-64 mb-10 flex items-center justify-center text-slate-600">
          {currentContent.icon}
        </div>

        <h1 className="text-4xl font-extrabold mb-6 leading-tight">
          {currentContent.title}
        </h1>
        
        <p className="text-slate-400 mb-10 max-w-sm text-sm leading-relaxed">
          {currentContent.description}
        </p>

        <ul className="space-y-4 mb-12 flex-1">
          {currentContent.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
              {feature.icon}
              {feature.text}
            </li>
          ))}
        </ul>

        {currentContent.testimonial ? (
          <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 mt-auto">
            <p className="italic text-sm text-slate-300 mb-4 leading-relaxed">
              {currentContent.testimonial.quote}
            </p>
            <p className="text-xs text-slate-500">— {currentContent.testimonial.author}</p>
          </div>
        ) : (
          <div className="mt-auto">
            <p className="text-xs text-slate-500">{currentContent.footerText}</p>
          </div>
        )}
      </div>

      {/* Dynamic Right Panel */}
      <div className="flex-1 flex flex-col p-8 lg:p-12 relative overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
