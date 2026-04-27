import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, ArrowRight, ShieldCheck, CarFront, Activity, 
  Search, Calendar, Award, FileText, Clock, Plus, Star 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="w-full overflow-x-hidden font-sans text-primary">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-6 px-[5%] bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Wrench size={18} />
          </div>
          AutoPartsPro
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#" className="font-medium text-sm text-primary transition-colors">Home</a>
          <a href="#" className="font-medium text-sm text-slate-500 hover:text-primary transition-colors">Parts Catalog</a>
          <a href="#" className="font-medium text-sm text-slate-500 hover:text-primary transition-colors">Services</a>
          <a href="#" className="font-medium text-sm text-slate-500 hover:text-primary transition-colors">Appointments</a>
          <a href="#" className="font-medium text-sm text-slate-500 hover:text-primary transition-colors">About</a>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/customer/login" className="font-semibold text-sm text-primary bg-transparent border-none">Log in</Link>
          <Link to="/customer/register" className="bg-primary hover:bg-secondary text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center gap-2">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row py-12 lg:py-20 px-[5%] items-center gap-16 bg-white min-h-[calc(100vh-80px)]">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block bg-slate-100 text-slate-600 py-1 px-3 rounded-full text-xs font-semibold tracking-wider mb-6 uppercase">
            NEPAL'S #1 VEHICLE PARTS PLATFORM
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-primary mb-6">
            Find & Book<br />
            Vehicle Parts<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-300">Instantly.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            Genuine parts, expert service, AI-powered diagnostics — all in one clean platform. Trusted by 5,000+ vehicle owners across Nepal.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-16">
            <Link to="/customer/register" className="bg-primary hover:bg-secondary text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center gap-2">
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <button className="bg-transparent hover:border-primary text-primary border border-slate-200 py-3 px-6 rounded-lg font-semibold transition-all">
              Browse Parts
            </button>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 lg:gap-12">
            <div>
              <h3 className="text-2xl font-extrabold text-primary mb-1">10k+</h3>
              <p className="text-sm text-slate-500">Parts</p>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-primary mb-1">5k+</h3>
              <p className="text-sm text-slate-500">Customers</p>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-primary mb-1">500+</h3>
              <p className="text-sm text-slate-500">Centers</p>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-primary mb-1">99%</h3>
              <p className="text-sm text-slate-500">Genuine</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 relative flex justify-center items-center w-full">
          <div className="bg-white rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.05)] w-full max-w-md border border-slate-200">
            <div className="flex justify-between mb-12">
              <div className="flex items-center gap-2 bg-slate-50 py-2 px-4 rounded-full text-sm font-semibold border border-slate-200">
                <Activity size={16} />
                AI Health Check
              </div>
              <div className="flex items-center gap-1 bg-slate-50 py-2 px-4 rounded-full text-sm font-semibold border border-slate-200">
                <Star size={14} className="text-yellow-500 fill-yellow-500" /> 4.9 / 5.0
              </div>
            </div>
            <div className="flex justify-center mb-12 text-slate-300">
              <CarFront size={120} strokeWidth={1} />
            </div>
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-slate-200 -mt-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-0.5">System Status</h4>
                  <p className="text-xs text-slate-500">All Diagnostics Normal</p>
                </div>
              </div>
              <div className="bg-slate-100 py-1 px-3 rounded-xl text-xs font-semibold text-slate-500">Live</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-[5%] bg-slate-50 text-center">
        <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">FEATURES</div>
        <h2 className="text-4xl font-extrabold text-primary mb-4">Everything in one platform</h2>
        <p className="text-slate-500 mb-16">The most comprehensive toolkit for vehicle owners in Nepal.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-10 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all border border-transparent hover:border-slate-200">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-primary">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Genuine Parts Inventory</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Search and order genuine parts with guaranteed authenticity for your specific vehicle make and model.</p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all border border-transparent hover:border-slate-200">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-primary">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">AI Vehicle Diagnostics</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Predict failures before they happen using our advanced AI analysis of your vehicle's health data.</p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all border border-transparent hover:border-slate-200">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-primary">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Easy Appointments</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Book service slots in seconds. Choose your preferred time, mechanic, and service type instantly.</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all border border-transparent hover:border-slate-200">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-primary">
              <Award size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Loyalty Rewards</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Earn points on every purchase. Unlock Gold and Platinum tiers for exclusive discounts.</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all border border-transparent hover:border-slate-200">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-primary">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Invoice & Billing</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Transparent pricing with zero hidden fees. Get instant digital receipts for all parts and services.</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all border border-transparent hover:border-slate-200">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-primary">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Customer Tracking</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Track your orders in real-time. Access your complete service history and warranty information anytime.</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-[5%] text-center bg-white relative">
        <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">PROCESS</div>
        <h2 className="text-4xl font-extrabold text-primary mb-4">How It Works</h2>
        <p className="text-slate-500 mb-16">Hassle-free vehicle maintenance in three simple steps.</p>
        
        <div className="flex flex-col md:flex-row justify-between relative mt-16 z-10 gap-12 md:gap-0">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-slate-200 -z-10"></div>
          
          <div className="flex-1 px-4 relative bg-white">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-8 shadow-lg">01</div>
            <h3 className="text-xl font-bold mb-4">Register & Add Your Vehicle</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">Create an account and add your vehicle details for personalized part recommendations.</p>
          </div>
          
          <div className="flex-1 px-4 relative bg-white">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-8 shadow-lg">02</div>
            <h3 className="text-xl font-bold mb-4">Browse Parts or Book a Service</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">Search our inventory or schedule an appointment with a certified service center.</p>
          </div>
          
          <div className="flex-1 px-4 relative bg-white">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-8 shadow-lg">03</div>
            <h3 className="text-xl font-bold mb-4">Track, Manage & Earn Rewards</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">Monitor orders, track service history, and earn loyalty points on every purchase.</p>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-24 px-[5%] bg-slate-50">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">CATALOG</div>
            <h2 className="text-4xl font-extrabold text-primary mb-0">Popular Parts This Month</h2>
          </div>
          <a href="#" className="font-semibold text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
            View All Parts
            <ArrowRight size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-6 relative transition-shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-pointer group">
            <div className="absolute top-6 right-6 bg-slate-100 text-slate-600 py-1 px-3 rounded-xl text-xs font-semibold z-10">In Stock</div>
            <div className="h-48 flex items-center justify-center bg-slate-50 rounded-xl mb-6 text-slate-300">
              <Wrench size={48} strokeWidth={1} />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">CASTROL</div>
            <h3 className="text-base font-semibold mb-4 leading-relaxed">Castrol GTX 5W-30 Engine Oil</h3>
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg">Rs. 1,200</div>
              <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 relative transition-shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-pointer group">
            <div className="absolute top-6 right-6 bg-slate-100 text-slate-600 py-1 px-3 rounded-xl text-xs font-semibold z-10">In Stock</div>
            <div className="h-48 flex items-center justify-center bg-slate-50 rounded-xl mb-6 text-slate-300">
              <Wrench size={48} strokeWidth={1} />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">BOSCH</div>
            <h3 className="text-base font-semibold mb-4 leading-relaxed">Bosch Wiper Blade Set</h3>
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg">Rs. 850</div>
              <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 relative transition-shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-pointer group">
            <div className="absolute top-6 right-6 bg-red-50 text-red-500 py-1 px-3 rounded-xl text-xs font-semibold z-10">Low Stock</div>
            <div className="h-48 flex items-center justify-center bg-slate-50 rounded-xl mb-6 text-slate-300">
              <Wrench size={48} strokeWidth={1} />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">NGK</div>
            <h3 className="text-base font-semibold mb-4 leading-relaxed">NGK Spark Plug Set</h3>
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg">Rs. 480</div>
              <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 relative transition-shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-pointer group">
            <div className="absolute top-6 right-6 bg-slate-100 text-slate-600 py-1 px-3 rounded-xl text-xs font-semibold z-10">In Stock</div>
            <div className="h-48 flex items-center justify-center bg-slate-50 rounded-xl mb-6 text-slate-300">
              <Wrench size={48} strokeWidth={1} />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">EXIDE</div>
            <h3 className="text-base font-semibold mb-4 leading-relaxed">Exide Battery 35Ah</h3>
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg">Rs. 8,500</div>
              <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-[5%] bg-slate-50 text-center">
        <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">REVIEWS</div>
        <h2 className="text-4xl font-extrabold text-primary mb-4">Trusted by Drivers Nationwide</h2>
        <p className="text-slate-500 mb-16">Here's what our community has to say.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-10 rounded-3xl shadow-sm">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} className="text-slate-400 fill-slate-400" />
              ))}
            </div>
            <p className="text-slate-500 text-base leading-relaxed mb-8 italic">"Found genuine brake pads at half the market price. Delivery was super fast!"</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">RT</div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Ramesh Thapa</h4>
                <p className="text-xs text-slate-400">Verified Customer</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-sm">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} className="text-slate-400 fill-slate-400" />
              ))}
            </div>
            <p className="text-slate-500 text-base leading-relaxed mb-8 italic">"The AI diagnostics told me my battery was failing before it died. Saved me a lot of trouble!"</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-sm">SS</div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Sita Sharma</h4>
                <p className="text-xs text-slate-400">Verified Customer</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-sm">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} className="text-slate-400 fill-slate-400" />
              ))}
            </div>
            <p className="text-slate-500 text-base leading-relaxed mb-8 italic">"Booked my full service in 2 minutes. The staff was professional and on time."</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">BR</div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Bikash Rai</h4>
                <p className="text-xs text-slate-400">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-[5%] bg-primary text-white text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Join 5,000+ Vehicle Owners</h2>
        <p className="text-slate-400 text-lg max-w-lg mx-auto mb-12 leading-relaxed">Genuine parts, smart diagnostics, and hassle-free service appointments — all in one place.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-primary py-3 px-8 rounded-lg font-semibold transition-colors">Register Free</button>
          <button className="bg-secondary text-white border border-slate-700 py-3 px-8 rounded-lg font-semibold transition-colors hover:bg-slate-800">Learn More</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-8 px-[5%] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 max-w-xs">
            <div className="flex items-center gap-2 font-bold text-xl text-primary mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Wrench size={18} />
              </div>
              AutoPartsPro
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">Nepal's trusted vehicle parts & service platform. Genuine parts, expert service, every time.</p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">Partner Network</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">News & Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">Parts Catalog</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">Book Service</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">AI Diagnostics</a></li>
              <li><a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">Loyalty Program</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li><p className="text-slate-500 text-sm">01-4432190</p></li>
              <li><p className="text-slate-500 text-sm">info@autopartspro.com.np</p></li>
              <li><p className="text-slate-500 text-sm">Kathmandu, Nepal</p></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <p className="text-slate-400 text-sm">© 2026 AutoParts Pro Nepal. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
