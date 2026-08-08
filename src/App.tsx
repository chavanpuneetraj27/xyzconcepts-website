import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import Home from "@/pages/Home";
import CorporateEvents from "@/pages/CorporateEvents";
import SocialEvents from "@/pages/SocialEvents";
import Portfolio from "@/pages/Portfolio";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";

import Seo from "@/seo/Seo";
import { NOT_FOUND_SEO, PAGE_BY_PATH } from "@/seo/config";

const queryClient = new QueryClient();

// ── Grain / film noise overlay ──────────────────────────────────────────────
// A subtle SVG fractal-noise texture at z-index 9980 (below transitions at 9990)
// mix-blend-mode overlay adds tactile depth without affecting readability
const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E";

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none select-none z-[9980]"
      style={{
        backgroundImage: `url("${GRAIN_SVG}")`,
        backgroundSize: "256px 256px",
        opacity: 0.055,
        mixBlendMode: "overlay",
      }}
    />
  );
}

function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/">
          <Seo page={PAGE_BY_PATH["/"]} />
          <PageTransition><Home /></PageTransition>
        </Route>
        <Route path="/corporate-events">
          <Seo page={PAGE_BY_PATH["/corporate-events"]} />
          <PageTransition><CorporateEvents /></PageTransition>
        </Route>
        <Route path="/social-events">
          <Seo page={PAGE_BY_PATH["/social-events"]} />
          <PageTransition><SocialEvents /></PageTransition>
        </Route>
        <Route path="/portfolio">
          <Seo page={PAGE_BY_PATH["/portfolio"]} />
          <PageTransition><Portfolio /></PageTransition>
        </Route>
        <Route path="/about">
          <Seo page={PAGE_BY_PATH["/about"]} />
          <PageTransition><About /></PageTransition>
        </Route>
        <Route path="/contact">
          <Seo page={PAGE_BY_PATH["/contact"]} />
          <PageTransition><Contact /></PageTransition>
        </Route>
        <Route>
          <Seo page={NOT_FOUND_SEO} noindex />
          <PageTransition><NotFound /></PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <GrainOverlay />
          <ScrollToTop />
          <LoadingScreen />
          <ScrollProgress />
          <Navbar />
          <main className="min-h-[100dvh] bg-white text-[#111] relative selection:bg-[#FFC107] selection:text-black">
            <Router />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
