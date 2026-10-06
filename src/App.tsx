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
import SmoothScroll from "@/components/motion/SmoothScroll";

import Seo from "@/seo/Seo";
import { NOT_FOUND_SEO, PAGE_BY_PATH } from "@/seo/config";
import { lenisRef } from "@/lib/motion";

const queryClient = new QueryClient();

/** Film grain over everything. Sits below the route transition curtain. */
function GrainOverlay() {
  return <div aria-hidden className="fixed inset-0 pointer-events-none select-none z-[9980] noise" />;
}

/** Jump to top on route change — through Lenis when it is running, so the two never disagree. */
function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    const l = lenisRef.current;
    if (l) l.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
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

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <SmoothScroll>
            <GrainOverlay />
            <ScrollToTop />
            <LoadingScreen />
            <ScrollProgress />
            <Navbar />
            <main className="min-h-[100dvh] bg-ink text-paper relative selection:bg-sun selection:text-ink">
              <Router />
            </main>
            <Footer />
            <FloatingWhatsApp />
          </SmoothScroll>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
