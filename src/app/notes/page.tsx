"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const studyMaterials = [
  {
    title: "Complete AI/ML Notes Bundle",
    pages: "66 pages",
    updated: "Updated Oct 2025",
    description: "Get all 5 comprehensive study notes in one package! Save $16 when you buy the complete collection covering all essential AI/ML topics.",
    tags: ["Machine Learning", "NLP", "AI Planning", "Ethics in AI", "All Topics Included"],
    price: "$29",
    priceType: "One-time",
    discount: "SAVE $16",
    image: "https://ext.same-assets.com/758970161/462578383.jpeg",
    featured: true,
    previewUrl: "#",
  },
  {
    title: "Introduction to Machine Learning",
    pages: "15 pages",
    updated: "Updated May 2025",
    description: "Foundational machine learning concepts including supervised learning, unsupervised learning, model evaluation, and optimization techniques.",
    tags: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Cross-Validation", "Feature Engineering", "Optimization"],
    price: "$9",
    priceType: "One-time",
    image: "https://ext.same-assets.com/758970161/3784191359.jpeg",
    featured: false,
    previewUrl: "#",
  },
  {
    title: "Natural Language Processing",
    pages: "14 pages",
    updated: "Updated Oct 2025",
    description: "Complete NLP guide covering text preprocessing, vectorization, transformers, BERT, and modern language model architectures.",
    tags: ["NLP", "BERT", "Transformers", "Text Processing"],
    price: "$9",
    priceType: "One-time",
    image: "https://ext.same-assets.com/758970161/3832017242.webp",
    featured: false,
    previewUrl: "#",
  },
  {
    title: "AI Planning & Search",
    pages: "12 pages",
    updated: "Updated Aug 2025",
    description: "Covers search algorithms, heuristic methods, constraint satisfaction, and planning in AI systems.",
    tags: ["Search Algorithms", "Heuristics", "Planning", "CSP"],
    price: "$9",
    priceType: "One-time",
    image: "https://ext.same-assets.com/758970161/4200856075.jpeg",
    featured: false,
    previewUrl: "#",
  },
  {
    title: "Ethics in AI",
    pages: "10 pages",
    updated: "Updated Sep 2025",
    description: "Explores fairness, accountability, transparency, and ethical considerations in modern AI systems.",
    tags: ["Ethics", "Fairness", "Accountability", "AI Policy"],
    price: "$9",
    priceType: "One-time",
    image: "https://ext.same-assets.com/758970161/795805715.jpeg",
    featured: false,
    previewUrl: "#",
  },
];

export default function NotesPage() {
  const featured = studyMaterials.find(m => m.featured);
  const rest = studyMaterials.filter(m => !m.featured);

  const handleBuyNow = (title: string, price: string) => {
    // TODO: Connect to Stripe payment gateway
    alert(`Stripe payment for ${title} (${price}) coming soon!`);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 py-16 pb-32" style={{ maxWidth: '672px' }}>

        {/* Header */}
        <section className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">Study Notes</h1>
          <p className="text-foreground leading-relaxed font-medium">
            Study materials covering Machine Learning, NLP, AI Planning, and AI Ethics.
            These are the exact notes I used during my Master's program, concise and comprehensive.
          </p>
        </section>

        {/* Featured Bundle */}
        {featured && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Featured Bundle</h2>
            <Card className="overflow-hidden border-2 border-green-400">
              <div className="relative h-48 bg-muted overflow-hidden">
                {featured.discount && (
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    {featured.discount}
                  </span>
                )}
                <Image
                  src={featured.image}
                  alt={featured.title}
                  width={600}
                  height={192}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-xl mb-1">{featured.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {featured.pages} • {featured.updated}
                </p>
                <p className="text-sm text-foreground mb-4">{featured.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {featured.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold">{featured.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">{featured.priceType}</span>
                  </div>
                  <Button size="sm" className="gap-1" onClick={() => handleBuyNow(featured.title, featured.price)}>
                    <NotesIcon />
                    Buy Now
                  </Button>
                </div>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <a href={featured.previewUrl}>
                    <EyeIcon />
                    Preview
                  </a>
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Individual Notes */}
        <section>
          <h2 className="text-xl font-bold mb-4">Individual Notes</h2>
          <div className="space-y-4">
            {rest.map((material, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex gap-4 p-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <Image
                      src={material.image}
                      alt={material.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1">{material.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {material.pages} • {material.updated}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {material.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {material.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                      {material.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">+{material.tags.length - 3}</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{material.price}</span>
                      <Button size="sm" className="gap-1 h-7 text-xs" onClick={() => handleBuyNow(material.title, material.price)}>
                        <NotesIcon />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}