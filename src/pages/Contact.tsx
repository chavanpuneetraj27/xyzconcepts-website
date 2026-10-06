import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, Mail, Instagram, MapPin } from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import { RevealLines, FadeUp } from "@/components/motion/Reveal";
import { EASE_STAGE, EASE_OUT } from "@/lib/motion";

/** Enquiries are delivered here. Both are already public elsewhere on the site. */
const ENQUIRY_WHATSAPP = "919063377915";
const ENQUIRY_EMAIL = "connect@xyzconcepts.com";

type EnquiryForm = {
  name: string; email: string; phone: string;
  eventType: string; date: string; guests: string; message: string;
};

/**
 * Human-readable enquiry, used for both the WhatsApp and the email body.
 * Optional fields are omitted entirely rather than sent as empty labels.
 */
function formatEnquiry(form: EnquiryForm): string {
  const lines = [
    "New event enquiry from xyzconcepts.com",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
  ];
  if (form.phone) lines.push(`Phone: ${form.phone}`);
  lines.push(`Event type: ${form.eventType}`);
  if (form.date) lines.push(`Event date: ${form.date}`);
  if (form.guests) lines.push(`Estimated guests: ${form.guests}`);
  if (form.message) lines.push("", `Vision: ${form.message}`);
  return lines.join("\n");
}

const EVENT_TYPES = [
  "Corporate Conference / Summit", "Annual Day / Town Hall", "Brand Activation", "Exhibition / Stall Design",
  "Wedding / Engagement", "Birthday / Milestone Celebration", "Anniversary", "Baby Shower / Naming Ceremony",
  "Product Launch", "Corporate Gifting", "Pitch Deck Design", "Other",
];

const FIELDS = [
  { name: "name", label: "Your Name *", type: "text", required: true },
  { name: "email", label: "Email Address *", type: "email", required: true },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", required: false },
  { name: "date", label: "Event Date (Approx)", type: "text", required: false },
  { name: "guests", label: "Estimated Guests", type: "text", required: false },
] as const;

const fieldCls =
  "peer w-full bg-transparent text-paper placeholder:text-transparent px-0 pt-6 pb-3 text-base font-body border-b border-white/20 focus:border-sun outline-none transition-colors duration-300 rounded-none appearance-none";
const labelCls =
  "absolute left-0 top-6 eyebrow text-[0.6rem] text-white/45 transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-sun peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-white/60";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<EnquiryForm>({ name: "", email: "", phone: "", eventType: "", date: "", guests: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enquiryText = formatEnquiry(form);
  const whatsappHref = `https://wa.me/${ENQUIRY_WHATSAPP}?text=${encodeURIComponent(enquiryText)}`;
  const mailtoHref =
    `mailto:${ENQUIRY_EMAIL}` +
    `?subject=${encodeURIComponent(`Event enquiry — ${form.name || "website"}`)}` +
    `&body=${encodeURIComponent(enquiryText)}`;

  /**
   * Hands the enquiry off to WhatsApp, pre-filled and ready to send. There is
   * no backend in this project, so the enquiry is routed to the channel the
   * business already runs on. window.open is called synchronously inside the
   * submit handler so it counts as a user gesture and is not blocked, and the
   * success screen still offers both channels in case the handoff fails.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
    setLoading(false);
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: <PhoneCall size={16} />, label: "Call & WhatsApp", value: "+91 90633 77915", href: "https://wa.me/919063377915" },
    { icon: <PhoneCall size={16} />, label: "Call & WhatsApp", value: "+91 74163 77915", href: "https://wa.me/917416377915" },
    { icon: <Mail size={16} />, label: "Email", value: "connect@xyzconcepts.com", href: "mailto:connect@xyzconcepts.com" },
    { icon: <Instagram size={16} />, label: "Instagram", value: "@xyz.concepts", href: "https://instagram.com/xyz.concepts" },
    { icon: <MapPin size={16} />, label: "Location", value: "Hyderabad, India", href: undefined },
  ];

  return (
    <div className="bg-ink">
      {/* Opening strip */}
      <section className="relative bg-sun text-ink pt-36 md:pt-44 pb-16 md:pb-24 overflow-hidden">
        <div className="container-x">
          <motion.p className="eyebrow text-ink/55 mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE_STAGE }}>
            Get In Touch
          </motion.p>
          <RevealLines as="h1" text={["Let's build", "something", "unforgettable."]} className="display-xl text-ink" delay={0.15} lineClass={(_, i) => (i === 2 ? "text-outline text-outline-ink" : undefined)} />
        </div>
      </section>

      <section className="container-x section-y">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Channels */}
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Fastest" title={["The fastest way", "to reach us?"]} size="md" className="mb-8" />
            <FadeUp delay={0.2}>
              <a
                href="https://wa.me/919063377915?text=Hi%20XYZ%20Concepts!%20I'd%20like%20to%20plan%20an%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden flex items-center justify-between gap-4 bg-sun text-ink px-7 py-6 isolate before:absolute before:inset-0 before:-z-10 before:bg-paper before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:[transition-timing-function:cubic-bezier(0.76,0,0.24,1)] hover:before:scale-y-100"
              >
                <span className="display-sm">WhatsApp us directly</span>
                <span className="text-xl transition-transform duration-500 group-hover:translate-x-2">→</span>
              </a>
            </FadeUp>

            <ul className="mt-12 border-t border-white/10">
              {contactInfo.map((item, i) => (
                <FadeUp key={i} delay={0.25 + i * 0.07}>
                  <li className="flex items-center gap-5 py-5 border-b border-white/10">
                    <span className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-sun shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="eyebrow text-[0.56rem] text-white/40">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-body text-paper hover:text-sun transition-colors">{item.value}</a>
                      ) : (
                        <span className="font-body text-paper">{item.value}</span>
                      )}
                    </div>
                  </li>
                </FadeUp>
              ))}
            </ul>

            <FadeUp delay={0.6} className="mt-10 border border-white/10 p-7">
              <p className="eyebrow text-sun mb-4">Working Hours</p>
              <p className="font-body text-white/70">Monday – Saturday: 10:00 AM – 7:00 PM</p>
              <p className="font-body text-white/70 mt-1">Sunday: By Appointment</p>
            </FadeUp>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                className="bg-sun text-ink p-10 md:p-14 min-h-[28rem] flex flex-col items-start justify-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                <span className="display-xl leading-none">✓</span>
                <h3 className="display-md mt-4">Almost there!</h3>
                <p className="font-body text-ink/75 mt-5 max-w-lg leading-relaxed">
                  We've opened WhatsApp with your enquiry ready to go — just hit send and Shreya or Vaishali will be in touch within 24 hours.
                </p>
                <p className="font-body text-ink/65 text-sm mt-6">
                  WhatsApp didn't open?{" "}
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-ink">Try again</a>{" "}
                  or{" "}
                  <a href={mailtoHref} className="underline font-semibold hover:text-ink">send it by email</a>.
                </p>
              </motion.div>
            ) : (
              <FadeUp delay={0.15}>
                <form onSubmit={handleSubmit} className="border border-white/10 p-7 md:p-10 lg:p-12">
                  <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-6 mb-4">
                    <h2 className="display-md text-paper" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>Send us an enquiry</h2>
                    <span className="eyebrow text-[0.56rem] text-white/35 hidden sm:block">Replies within 24h</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    {FIELDS.map((field) => (
                      <div key={field.name} className="relative">
                        <input
                          id={`f-${field.name}`}
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          placeholder=" "
                          value={form[field.name]}
                          onChange={handleChange}
                          className={fieldCls}
                        />
                        <label htmlFor={`f-${field.name}`} className={labelCls}>{field.label}</label>
                      </div>
                    ))}
                    <div className="relative">
                      <select
                        id="f-eventType"
                        name="eventType"
                        required
                        value={form.eventType}
                        onChange={handleChange}
                        className={`${fieldCls} ${form.eventType ? "text-paper" : "text-white/45"} pr-8 bg-ink`}
                      >
                        <option value="" disabled>Select Event Type *</option>
                        {EVENT_TYPES.map((t) => <option key={t} value={t} className="bg-ink text-paper">{t}</option>)}
                      </select>
                      <span className="absolute right-0 top-7 text-sun text-xs pointer-events-none">▼</span>
                    </div>
                  </div>

                  <div className="relative mt-2">
                    <textarea
                      id="f-message"
                      name="message"
                      rows={4}
                      placeholder=" "
                      value={form.message}
                      onChange={handleChange}
                      className={`${fieldCls} resize-none`}
                    />
                    <label htmlFor="f-message" className={labelCls}>Tell Us About Your Vision</label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative overflow-hidden mt-10 w-full bg-sun text-ink py-5 eyebrow isolate before:absolute before:inset-0 before:-z-10 before:bg-paper before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:[transition-timing-function:cubic-bezier(0.76,0,0.24,1)] hover:before:scale-y-100 disabled:opacity-60"
                  >
                    <span className="inline-flex items-center gap-3">
                      {loading ? "Opening WhatsApp..." : "Send Enquiry"}
                      <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                    </span>
                  </button>
                  <p className="font-body text-white/35 text-xs mt-4">Opens WhatsApp with your enquiry pre-filled. Nothing is sent until you tap send.</p>
                </form>
              </FadeUp>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
