import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      hover: "hover:bg-[#1877F2] hover:border-[#1877F2]",
      shadow: "hover:shadow-[#1877F2]/20",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      hover: "hover:bg-[#E4405F] hover:border-[#E4405F]",
      shadow: "hover:shadow-[#E4405F]/20",
    },
    {
      name: "X",
      icon: <Twitter size={20} />,
      hover: "hover:bg-[#000000] hover:border-[#000000]",
      shadow: "hover:shadow-white/10",
    },
    {
      name: "YouTube",
      icon: <Youtube size={20} />,
      hover: "hover:bg-[#FF0000] hover:border-[#FF0000]",
      shadow: "hover:shadow-[#FF0000]/20",
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* BRAND COLUMN */}
          <div className="space-y-8">
            <div>
              <Link
                href="/"
                className="text-3xl font-black tracking-tighter text-white italic"
              >
                FRESH<span className="text-green-500">CART.</span>
              </Link>
              <p className="text-slate-400 leading-relaxed max-w-xs text-sm mt-4 font-medium">
                Experience the finest selection of handpicked products,
                delivered with care and a commitment to quality.
              </p>
            </div>

            {/* SOCIAL ICONS WITH BRAND COLORS */}
            <div className="flex gap-4 justify-start">
              {socialLinks.map((social) => (
                <div
                  key={social.name}
                  className={`w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 transition-all duration-300 cursor-pointer hover:text-white hover:-translate-y-1.5 hover:shadow-2xl ${social.hover} ${social.shadow}`}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* SHOP COLUMN */}
          <div className="lg:ml-10">
            <h4 className="font-black text-white uppercase tracking-[0.2em] text-[10px] mb-8 opacity-40">
              Shop Selection
            </h4>
            <ul className="space-y-4 text-sm font-semibold">
              {[
                "All Products",
                "Featured Categories",
                "Our Brands",
                "Current Deals",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors inline-block decoration-green-500/0 hover:decoration-green-500/100 underline underline-offset-8 decoration-2"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT COLUMN */}
          <div>
            <h4 className="font-black text-white uppercase tracking-[0.2em] text-[10px] mb-8 opacity-40">
              Customer Care
            </h4>
            <ul className="space-y-4 text-sm font-semibold">
              {[
                "Track My Order",
                "Returns & Refunds",
                "Shipping Info",
                "Help Center",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-green-400 transition-colors inline-block decoration-green-500/0 hover:decoration-green-500/100 underline underline-offset-8 decoration-2"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl backdrop-blur-md">
            <h4 className="font-black text-white uppercase tracking-[0.2em] text-[10px] mb-4 opacity-40">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Join our inner circle for early access to sales and new drops.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full bg-slate-950 border border-slate-700/50 rounded-2xl px-5 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all placeholder:text-slate-600"
              />
              <button className="w-full bg-green-600 text-white rounded-2xl py-3.5 text-sm font-black uppercase tracking-widest hover:bg-green-500 transition-all shadow-lg shadow-green-900/30 active:scale-[0.96]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.25em]">
              © {currentYear} FRESHCART. PURE QUALITY.
            </p>
          </div>

          <div className="flex items-center gap-6 opacity-30 hover:opacity-100 transition-opacity duration-500">
            <div className="flex gap-4">
              <div className="w-10 h-6 bg-slate-800 rounded-md" />
              <div className="w-10 h-6 bg-slate-800 rounded-md" />
              <div className="w-10 h-6 bg-slate-800 rounded-md" />
            </div>
            <div className="h-4 w-[1px] bg-slate-800" />
            <span className="text-[10px] font-black text-slate-400 tracking-[0.2em]">
              EGP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
