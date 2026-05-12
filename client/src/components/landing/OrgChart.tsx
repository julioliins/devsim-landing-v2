import { Card } from "@/components/ui/card";
import { Crown } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

interface OrgChartProps {
  members: TeamMember[];
}

/**
 * Organograma visual com hierarquia.
 * Topo: Co-fundador & CEO/Tech Lead (líder do time)
 * Base: demais co-fundadores conectados por linhas verticais.
 */
export default function OrgChart({ members }: OrgChartProps) {
  if (members.length === 0) return null;

  const [leader, ...rest] = members;

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Card do líder */}
      <div className="flex justify-center mb-0">
        <Card className="w-full max-w-sm p-6 text-center border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow">
            <Crown className="w-3 h-3" />
            Liderança
          </span>
          <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-md ring-4 ring-primary/20">
            {leader.initials}
          </div>
          <h3 className="font-bold text-lg text-foreground">{leader.name}</h3>
          <p className="text-sm font-medium text-primary mb-2">{leader.role}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{leader.bio}</p>
        </Card>
      </div>

      {/* Linhas conectoras (visíveis apenas em md+) */}
      {rest.length > 0 && (
        <div
          aria-hidden
          className="hidden md:block relative w-full h-12"
        >
          {/* Linha vertical do líder */}
          <div className="absolute left-1/2 top-0 w-px h-6 bg-primary/40 -translate-x-px" />
          {/* Linha horizontal */}
          <div
            className="absolute top-6 h-px bg-primary/40"
            style={{
              left: `${100 / (rest.length * 2)}%`,
              right: `${100 / (rest.length * 2)}%`,
            }}
          />
          {/* Linhas verticais para cada subordinado */}
          {rest.map((_, i) => (
            <div
              key={i}
              className="absolute top-6 w-px h-6 bg-primary/40"
              style={{ left: `${(100 / (rest.length * 2)) * (1 + 2 * i)}%` }}
            />
          ))}
        </div>
      )}

      {/* Cards dos co-fundadores */}
      {rest.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-${rest.length} gap-6`}>
          {rest.map((member) => (
            <Card
              key={member.name}
              className="p-6 text-center border-border bg-card hover:border-primary/40 transition"
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/80 to-cyan-500/80 flex items-center justify-center text-white text-xl font-bold shadow-md">
                {member.initials}
              </div>
              <h3 className="font-bold text-base text-foreground">{member.name}</h3>
              <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
