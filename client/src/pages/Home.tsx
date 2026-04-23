import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Users, Zap, Shield, BookOpen, Rocket } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img
              src="/manus-storage/pasted_file_db66k3_image_e35bcb12.png"
              alt="DevSim Studios"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-lg text-foreground">DevSim Studios</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition">Sobre</a>
            <a href="#product" className="text-sm text-muted-foreground hover:text-foreground transition">Produto</a>
            <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition">Benefícios</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition">Contato</a>
          </nav>
          <div className="flex gap-2">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={logout}
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocation("/auth/login")}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setLocation("/auth/signup")}
                >
                  Comece Grátis
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">🚀 Educação em Tecnologia</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Transforme Teoria em Prática com Simuladores Reais
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Pratique desenvolvimento de software em ambientes seguros e realistas. Aprenda fazendo, erre sem medo, cresça com confiança.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setLocation("/auth/signup")}
              >
                Comece a Praticar Gratuitamente
              </Button>
              <Button size="lg" variant="outline">
                Solicite uma Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Quem Somos</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Fundada em 2026, a DevSim Studios resolve um problema real: a lacuna entre teoria e prática em educação técnica.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Estudantes e profissionais em formação enfrentam dificuldades para desenvolver competências práticas. O ensino ainda é fortemente teórico e não oferece ambientes seguros para experimentação.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A DevSim Studios surge como resposta: criamos simuladores virtuais web-based, acessíveis e focados em cenários reais de desenvolvimento de software.
                </p>
                <div className="space-y-3 pt-4">
                  <div className="flex gap-3">
                    <div className="w-1 bg-primary rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-foreground">Missão</h4>
                      <p className="text-sm text-muted-foreground">Democratizar o acesso a ambientes de prática profissional seguros e realistas.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 bg-primary rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-foreground">Visão</h4>
                      <p className="text-sm text-muted-foreground">Ser a plataforma educacional de referência para simulação em desenvolvimento de software.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <h3 className="text-xl font-bold text-foreground">Nossa Equipe</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Alexandre Fernandes</h4>
                    <p className="text-sm text-muted-foreground">CEO & Estratégia</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Carlos Eduardo</h4>
                    <p className="text-sm text-muted-foreground">CTO & Desenvolvimento</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Julio Lins</h4>
                    <p className="text-sm text-muted-foreground">COO & Operações</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-20 md:py-32 bg-card/50">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">DevSim: Simuladores para Desenvolvimento</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Pratique o ciclo completo de desenvolvimento em ambientes realistas, com feedback imediato e repetição ilimitada.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border border-border hover:border-primary/50 transition">
                <Code2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Cenários Realistas</h3>
                <p className="text-sm text-muted-foreground">Ambientes que reproduzem situações autênticas de desenvolvimento, com requisitos, restrições e objetivos claros.</p>
              </Card>
              <Card className="p-6 border border-border hover:border-primary/50 transition">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Feedback Inteligente</h3>
                <p className="text-sm text-muted-foreground">Receba feedback em tempo real sobre decisões técnicas, qualidade de código e conformidade com requisitos.</p>
              </Card>
              <Card className="p-6 border border-border hover:border-primary/50 transition">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Colaboração em Equipe</h3>
                <p className="text-sm text-muted-foreground">Trabalhe com outros usuários em simuladores colaborativos que reproduzem dinâmicas reais de equipes.</p>
              </Card>
              <Card className="p-6 border border-border hover:border-primary/50 transition">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Ambiente Seguro</h3>
                <p className="text-sm text-muted-foreground">Cometer erros sem consequências reais. Praticar quantas vezes forem necessárias para dominar.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 md:py-32 bg-card/50">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Benefícios para Cada Público</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 border border-border">
                <BookOpen className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Para Estudantes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Prática segura sem consequências reais</li>
                  <li>✓ Aprendizado acelerado com feedback imediato</li>
                  <li>✓ Portfólio real para impressionar empregadores</li>
                  <li>✓ Ingressar no mercado com confiança</li>
                </ul>
              </Card>
              <Card className="p-8 border border-border">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Para Educadores</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Ferramenta pedagógica comprovada</li>
                  <li>✓ Flexibilidade na integração curricular</li>
                  <li>✓ Dashboard para acompanhar alunos</li>
                  <li>✓ Cenários customizáveis</li>
                </ul>
              </Card>
              <Card className="p-8 border border-border">
                <Rocket className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Para Empresas</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Treinamento eficiente de equipes</li>
                  <li>✓ Redução de riscos em produção</li>
                  <li>✓ Onboarding acelerado</li>
                  <li>✓ Desenvolvimento de competências</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">DevSim Studios</h4>
              <p className="text-sm text-muted-foreground">Transformando educação técnica através de simuladores realistas.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Simuladores</a></li>
                <li><a href="#" className="hover:text-foreground transition">Preços</a></li>
                <li><a href="#" className="hover:text-foreground transition">Documentação</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-foreground transition">Termos</a></li>
                <li><a href="#" className="hover:text-foreground transition">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 DevSim Studios. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
