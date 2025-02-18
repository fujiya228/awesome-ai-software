import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { Software } from "../types/software";
import { useRef, useEffect } from "react";

interface SoftwareCardProps {
  software: Software;
}

export function SoftwareCard({ software }: SoftwareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <a href={software.url} target="_blank" rel="noopener noreferrer">
      <div ref={cardRef} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 rounded-lg blur transition duration-500"></div>
        <Card className="relative h-full card-neon-hover bg-opacity-50 backdrop-blur-sm border border-blue-500/10 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-blue-100 group-hover:text-blue-50 transition-colors">
                {software.name}
              </CardTitle>
            </div>
            <CardDescription>
              <Badge variant="outline" className="mt-1 border-blue-400/30 text-blue-200">
                {software.category}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-blue-100/80 group-hover:text-blue-100 transition-colors">
              {software.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {software.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-blue-500/10 text-blue-200 border border-blue-400/20 transition-all duration-300 group-hover:bg-blue-500/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </a>
  );
}