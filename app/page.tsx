"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Code, Sparkles, Search, X, Star } from "lucide-react";
import AdUnit from "./components/AdUnit";
import { tools, ToolCategory } from "./data/tools";
import WebsiteSchema from "./components/WebsiteSchema";
import ToolsCarousel from "./components/ToolsCarousel";
import ToolIcon from "./components/ToolIcon";
import ToolMarquee from "./components/ToolMarquee";

const features = [
  { icon: <Zap style={{ width: 20, height: 20 }} />, title: "Lightning Fast", description: "All tools run locally in your browser" },
  { icon: <Shield style={{ width: 20, height: 20 }} />, title: "100% Private", description: "Your data never leaves your device" },
  { icon: <Code style={{ width: 20, height: 20 }} />, title: "Built for Everyone", description: "Simple enough for anyone, powerful for pros" },
  { icon: <Sparkles style={{ width: 20, height: 20 }} />, title: "Always Free", description: "No accounts, no limits" },
];

type CategoryFilter = "All" | "Favorites" | ToolCategory;
const CATEGORIES: CategoryFilter[] = ["All", "Developer", "Design", "Content", "Security", "Productivity", "Math", "Utility"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<any[]>([]); // Using any[] to safely map from ID
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedFavs = localStorage.getItem("favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const savedRecents = localStorage.getItem("recent_tools");
    if (savedRecents) {
      const ids = JSON.parse(savedRecents);
      const recentTools = ids.map((id: string) => tools.find(t => t.id === id)).filter(Boolean);
      setRecents(recentTools);
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    let newFavs;
    if (favorites.includes(id)) {
      newFavs = favorites.filter(f => f !== id);
    } else {
      newFavs = [...favorites, id];
    }
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase());

      let matchesCategory = true;
      if (activeCategory === "Favorites") {
        matchesCategory = favorites.includes(tool.id);
      } else if (activeCategory !== "All") {
        matchesCategory = tool.category === activeCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory, favorites]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <WebsiteSchema />
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />

      {/* Hero Section */}
      <section style={{ position: 'relative', zIndex: 10, paddingTop: 160, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: 100, fontSize: 13, color: '#fb923c', marginBottom: 32 }}>
            <Sparkles style={{ width: 16, height: 16 }} />
            <span>100+ Free Tools • Private • No Signup</span>
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 'bold', marginBottom: 24, lineHeight: 1.1, color: 'var(--title-color)' }}>
            Daily Developer Tools<br />
            <span className="gradient-text">That Just Work</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'var(--muted-text)', maxWidth: 800, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Fast, beautiful, and privacy-focused tools for developers, designers, and everyone. Everything runs in your browser.
          </p>
        </div>

        {/* Tool Marquee */}
        <ToolMarquee />

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', paddingTop: 40 }}>
          {/* Recently Used Tools */}
          {mounted && (
            <div style={{ marginTop: 40 }}>
              <p style={{ color: 'var(--muted-text)', fontSize: 13, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Recently Used</p>

              {recents.length > 0 ? (
                recents.length > 4 ? (
                  <ToolsCarousel tools={recents} />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
                    {recents.map(tool => (
                      <Link key={tool.id} href={`/tools/${tool.id}`} className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', border: '1px solid var(--border-color)', background: 'var(--card-bg)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ToolIcon name={tool.icon} size={20} style={{ color: '#fb923c' }} />
                        </div>
                        <span style={{ color: 'var(--title-color)', fontSize: 14, fontWeight: 500 }}>{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                )
              ) : (
                <div style={{ padding: 24, border: '1px dashed var(--border-color)', borderRadius: 12, display: 'inline-block' }}>
                  <p style={{ color: '#6b7280', fontSize: 14 }}>Start using tools to see them here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* <AdUnit slot="homepage_top" /> */}
      </div>

      <section style={{ position: 'relative', zIndex: 10, padding: '60px 24px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
            {features.map((feature, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div className="icon-box-primary" style={{ width: 48, height: 48, margin: '0 auto 16px' }}>{feature.icon}</div>
                <h3 style={{ fontWeight: 600, color: 'var(--title-color)', marginBottom: 4, fontSize: 15 }}>{feature.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted-text)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" style={{ position: 'relative', zIndex: 10, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 'bold', marginBottom: 12, color: 'var(--title-color)' }}>
              {query ? 'Search Results' : <><span className="gradient-text">{activeCategory === 'All' ? 'Popular' : activeCategory}</span> Tools</>}
            </h2>
            <p style={{ color: 'var(--muted-text)' }}>{filteredTools.length} tools available</p>
          </div>

          {/* Category Pills */}
          <div className="category-tabs no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'btn-primary' : 'btn-secondary'}
                style={{ borderRadius: 100, fontSize: 13, padding: '8px 16px', height: 'auto', borderWidth: 1, whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                {cat}
              </button>
            ))}
            {mounted && favorites.length > 0 && (
              <button
                onClick={() => setActiveCategory("Favorites")}
                className={activeCategory === "Favorites" ? 'btn-primary' : 'btn-secondary'}
                style={{ borderRadius: 100, fontSize: 13, padding: '8px 16px', height: 'auto', borderWidth: 1, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                <Star size={14} fill={activeCategory === "Favorites" ? "white" : "none"} /> Favorites ({favorites.length})
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="glass-card" style={{ padding: 24, display: 'block', textDecoration: 'none', position: 'relative' }}>
                <button
                  onClick={(e) => toggleFavorite(e, tool.id)}
                  style={{
                    position: 'absolute', top: 20, right: 20,
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: favorites.includes(tool.id) ? '#fb923c' : 'var(--muted-text)',
                    transition: 'all 0.2s',
                    zIndex: 10
                  }}
                >
                  <Star size={20} fill={favorites.includes(tool.id) ? "#fb923c" : "none"} />
                </button>

                <div className="icon-box-primary" style={{ width: 48, height: 48, marginBottom: 16 }}>
                  <ToolIcon name={tool.icon} size={24} style={{ color: '#fb923c' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--title-color)', marginBottom: 8, paddingRight: 24 }}>{tool.name}</h3>
                  <span style={{ fontSize: 10, background: 'var(--card-hover-bg)', padding: '2px 8px', borderRadius: 100, color: 'var(--muted-text)', border: '1px solid var(--border-color)' }}>{tool.category}</span>
                </div>
                <p style={{ color: 'var(--muted-text)', fontSize: 14, marginBottom: 16 }}>{tool.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', color: '#fb923c', fontSize: 14, fontWeight: 500 }}>
                  <span>Open tool</span>
                  <ArrowRight style={{ width: 16, height: 16, marginLeft: 8 }} />
                </div>
              </Link>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div style={{ textAlign: 'center', padding: 80, color: '#6b7280' }}>
              <p style={{ fontSize: 18 }}>No tools found matching "{query}"</p>
              <button onClick={() => { setQuery(""); setActiveCategory("All"); }} style={{ marginTop: 16, background: 'transparent', border: 'none', color: '#fb923c', cursor: 'pointer', textDecoration: 'underline' }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section style={{ position: 'relative', zIndex: 10, padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: 'clamp(40px, 8vw, 64px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(250, 204, 21, 0.05) 100%)' }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 'bold', marginBottom: 16, color: 'var(--title-color)' }}>Ready to boost your productivity?</h2>
              <p style={{ color: 'var(--muted-text)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px', fontSize: 15 }}>Start using our developer tools for free. No signup required, no data collected, just pure productivity.</p>
              <Link href="#tools" className="btn-primary">Get Started Free <ArrowRight style={{ width: 16, height: 16 }} /></Link>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* <AdUnit slot="homepage_bottom" /> */}
      </div>
    </div>
  );
}
