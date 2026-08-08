import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, Mail, Instagram, MapPin } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", eventType: "", date: "", guests: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  const contactInfo = [
    { icon: <PhoneCall size={18} />, label: "Call & WhatsApp", value: "+91 90633 77915", href: "https://wa.me/919063377915" },
    { icon: <PhoneCall size={18} />, label: "Call & WhatsApp", value: "+91 74163 77915", href: "https://wa.me/917416377915" },
    { icon: <Mail size={18} />, label: "Email", value: "connect@xyzconcepts.com", href: "mailto:connect@xyzconcepts.com" },
    { icon: <Instagram size={18} />, label: "Instagram", value: "@xyz.concepts", href: "https://instagram.com/xyz.concepts" },
    { icon: <MapPin size={18} />, label: "Location", value: "Hyderabad, India", href: "#" },
  ];

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Strip */}
      <section className="bg-[#FFC107] pt-40 pb-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-black/50 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get In Touch
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              className="text-black"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 12vw, 11rem)", lineHeight: 0.9 }}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            >
              Let's Build Something Unforgettable.
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-28 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Info */}
          <div>
            <h2 className="text-[#111] text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              The Fastest Way To Reach Us?
            </h2>
            <a
              href="https://wa.me/919063377915?text=Hi%20XYZ%20Concepts!%20I'd%20like%20to%20plan%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#111] text-white px-8 py-5 text-lg mb-10 font-bold tracking-[0.1em] uppercase hover:bg-[#FFC107] hover:text-black transition-colors duration-200"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              WhatsApp Us Directly →
            </a>
            <div className="space-y-8">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-10 h-10 bg-[#FFC107] flex items-center justify-center flex-none text-black text-base">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[#111]/40 text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</p>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[#111] text-base hover:text-[#FFC107] transition-colors font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {item.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-16 bg-[#F5F5F5] p-10">
              <h4 className="text-[#FFC107] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Working Hours</h4>
              <p className="text-[#111]/60 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Monday – Saturday: 10:00 AM – 7:00 PM</p>
              <p className="text-[#111]/60 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sunday: By Appointment</p>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <motion.div
                className="bg-[#FFC107] p-12 text-center min-h-[400px] flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-black text-7xl mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>✓</div>
                <h3 className="text-black text-4xl mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Got Your Enquiry!</h3>
                <p className="text-black/70 text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Shreya or Vaishali will be in touch within 24 hours. Can't wait to start building your vision!
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="border-b-2 border-[#FFC107] pb-3 mb-6">
                  <h2 className="text-[#111] text-3xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Send Us An Enquiry</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "name", label: "Your Name *", type: "text", required: true },
                    { name: "email", label: "Email Address *", type: "email", required: true },
                    { name: "phone", label: "Phone / WhatsApp", type: "tel", required: false },
                    { name: "date", label: "Event Date (Approx)", type: "text", required: false },
                    { name: "guests", label: "Estimated Guests", type: "text", required: false },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-[#111]/50 text-[11px] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        className="w-full bg-[#F5F5F5] text-[#111] px-4 py-3 text-sm border-b-2 border-[#111]/10 focus:border-[#FFC107] outline-none focus:bg-white transition-colors duration-200"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[#111]/50 text-[11px] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Event Type *</label>
                    <select
                      name="eventType"
                      required
                      value={form.eventType}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F5] text-[#111] px-4 py-3 text-sm border-b-2 border-[#111]/10 focus:border-[#FFC107] outline-none focus:bg-white transition-colors duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <option value="">Select Event Type</option>
                      <option>Corporate Conference / Summit</option>
                      <option>Annual Day / Town Hall</option>
                      <option>Brand Activation</option>
                      <option>Exhibition / Stall Design</option>
                      <option>Wedding / Engagement</option>
                      <option>Birthday / Milestone Celebration</option>
                      <option>Anniversary</option>
                      <option>Baby Shower / Naming Ceremony</option>
                      <option>Product Launch</option>
                      <option>Corporate Gifting</option>
                      <option>Pitch Deck Design</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[#111]/50 text-[11px] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Tell Us About Your Vision</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What are you dreaming of?"
                    className="w-full bg-[#F5F5F5] text-[#111] px-4 py-3 text-sm border-b-2 border-[#111]/10 focus:border-[#FFC107] outline-none focus:bg-white transition-colors duration-200 resize-none"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#111] text-white py-5 text-sm tracking-[0.2em] uppercase font-bold hover:bg-[#FFC107] hover:text-black transition-colors duration-300 cursor-pointer disabled:opacity-60"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {loading ? "Sending..." : "Send Enquiry →"}
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
