import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Bot,
  Code2,
  GraduationCap,
  Users,
  Zap,
  Shield,
  BookOpen,
  Rocket,
  Instagram,
  Mail,
  CheckCircle2,
  ArrowRight,
  Target,
  Eye,
  Heart,
  Sparkles,
  Globe,
  Smartphone,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { company, product } from "@/data/companyInfo";
import { MASCOT_IMAGE_URL } from "@/lib/mascot";

const featureIcons: Record<string, typeof Users> = {
  Users,
  GraduationCap,
  Bot,
  Code2,
};

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handlePrimaryCta = () => {
    setLocation(isAuthenticated ? "/career-selection" : "/auth/signup");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2">
            <img
              src="/manus-storage/pasted_file_db66k3_image_e35bcb12.png"
              alt="DevSim Studios"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-lg text-foreground">DevSim Studios</span>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition">Sobre</a>
            <a href="#mvv" className="text-sm text-muted-foreground hover:text-foreground transition">M.V.V.</a>
            <a href="#team" className="text-sm text-muted-foreground hover:text-foreground transition">Equipe</a>
            <a href="#product" className="text-sm text-muted-foreground hover:text-foreground transition">Produto</a>
            <a href="#access" className="text-sm text-muted-foreground hover:text-foreground transition">Acesso</a>
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
                <Button size="sm" variant="ghost" onClick={logout}>
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
                  Entrar
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

      {/* Hero — padrão Start Bootstrap (texto à esquerda, imagem à direita) */}
      <section
        id="top"
        className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-28"
      >
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 rounded-full text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              Educação aplicada em tecnologia
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Transforme teoria em prática com simuladores reais
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              {product.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handlePrimaryCta}
              >
                {product.pricing.cta.primary}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {product.pricing.cta.secondary}
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                4 carreiras habilitadas
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Mentor virtual incluído
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                100% gratuito durante a fase de validação
              </span>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent blur-3xl rounded-full" />
            <img
              src={MASCOT_IMAGE_URL}
              alt="Mascote Dev Sim"
              className="relative w-72 md:w-96 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Sobre — Quem Somos */}
      <section id="about" className="py-20 md:py-24">
        <div className="container max-w-5xl">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Nossa história</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Quem é a {company.name}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {company.shortDescription}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              {company.history.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <Card className="p-5 bg-primary/5 border-primary/30 mt-4">
                <div className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Nosso propósito</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{company.purpose}</p>
                  </div>
                </div>
              </Card>
            </div>
            <Card className="p-8 bg-card border-border space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/manus-storage/pasted_file_db66k3_image_e35bcb12.png"
                  alt="Logo DevSim"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="font-bold text-lg text-foreground">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">Identidade da marca</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Nossa identidade combina o azul da confiança técnica com o ciano da curiosidade. O mascote{" "}
                <strong className="text-foreground">Dev Sim</strong> traduz visualmente nosso método: tecnologia acessível,
                acolhedora e sempre disponível para guiar o aluno.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-md bg-primary text-primary-foreground p-3 text-center text-xs font-semibold shadow">
                  Primário
                  <div className="font-mono text-[10px] mt-1 opacity-80">#2563EB</div>
                </div>
                <div className="rounded-md bg-cyan-500 text-white p-3 text-center text-xs font-semibold shadow">
                  Acento
                  <div className="font-mono text-[10px] mt-1 opacity-80">#06B6D4</div>
                </div>
                <div className="rounded-md bg-foreground text-background p-3 text-center text-xs font-semibold shadow">
                  Neutro
                  <div className="font-mono text-[10px] mt-1 opacity-80">#0F172A</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Missão / Visão / Valores */}
      <section id="mvv" className="py-20 md:py-24 bg-card/50">
        <div className="container">
          <div className="text-center space-y-3 mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">M.V.V.</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Missão, Visão e Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Os princípios que guiam cada decisão de produto, conteúdo e relacionamento na DevSim Studios.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-5xl mx-auto">
            <Card className="p-8 border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Missão</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{company.mission}</p>
            </Card>
            <Card className="p-8 border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Visão</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{company.vision}</p>
            </Card>
          </div>
          <h3 className="text-center text-2xl font-bold text-foreground mb-6">Nossos Valores</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {company.values.map((v) => (
              <Card key={v.title} className="p-5 border-border hover:border-primary/40 transition">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{v.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe / Organograma */}
      <section id="team" className="py-20 md:py-24">
        <div className="container max-w-5xl">
          <div className="text-center space-y-3 mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Organograma</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Conheça a Equipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Co-fundadores que combinam tecnologia, produto e comunidade para construir o DevSim.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {company.team.map((member) => (
              <Card key={member.name} className="p-6 text-center border-border">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {member.initials}
                </div>
                <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Produto */}
      <section id="product" className="py-20 md:py-24 bg-card/50">
        <div className="container">
          <div className="text-center space-y-3 mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">O Produto</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{product.name}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{product.description}</p>
          </div>

          {/* Público-alvo */}
          <div className="max-w-4xl mx-auto mb-14">
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">Para quem foi pensado</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {product.audience.map((item, idx) => (
                <Card key={idx} className="p-5 border-border">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Funcionalidades — alternadas estilo Start Bootstrap */}
          <div className="max-w-5xl mx-auto space-y-12">
            <h3 className="text-2xl font-bold text-foreground text-center">Principais Funcionalidades</h3>
            {product.features.map((f, idx) => {
              const Icon = featureIcons[f.icon] || Code2;
              const reversed = idx % 2 === 1;
              return (
                <div
                  key={f.title}
                  className={`grid md:grid-cols-2 gap-8 items-center ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/15">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">{f.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                  <Card className="p-8 bg-gradient-to-br from-primary/5 to-cyan-500/5 border-primary/20 min-h-[180px] flex items-center justify-center">
                    <Icon className="w-24 h-24 text-primary/30" />
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Diferenciais */}
          <div className="max-w-5xl mx-auto mt-16">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">Diferenciais Competitivos</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {product.differentials.map((d) => (
                <Card key={d.title} className="p-6 border-border hover:border-primary/40 transition">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h4 className="font-bold text-foreground">{d.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como Acessar / Oferta */}
      <section id="access" className="py-20 md:py-24">
        <div className="container max-w-5xl">
          <div className="text-center space-y-3 mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Acesso ao produto</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Como utilizar o DevSim</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comece a praticar em menos de 2 minutos. Sem cartão de crédito, sem letras miúdas.
            </p>
          </div>

          {/* Card de oferta */}
          <Card className="p-8 md:p-10 mb-12 bg-gradient-to-br from-primary/10 via-background to-cyan-500/5 border-primary/30">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">{product.pricing.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{product.pricing.description}</p>
                <ul className="space-y-2">
                  {product.pricing.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={handlePrimaryCta}
                >
                  {product.pricing.cta.primary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const el = document.getElementById("contact");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Falar com a equipe
                </Button>
              </div>
            </div>
          </Card>

          {/* Plataformas */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 border-border flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Web — disponível agora</h4>
                <p className="text-sm text-muted-foreground">{product.platforms[0]}</p>
              </div>
            </Card>
            <Card className="p-6 border-border flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Mobile — em breve</h4>
                <p className="text-sm text-muted-foreground">{product.platforms[1]}</p>
              </div>
            </Card>
          </div>

          {/* Fluxo de uso */}
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Fluxo de uso em 4 passos</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {product.flow.map((s, idx) => (
              <Card key={s.step} className="p-5 border-border relative">
                <span className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow">
                  {s.step}
                </span>
                <h4 className="font-bold text-foreground mt-3 mb-2">{s.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                {idx < product.flow.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-primary/40" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios para públicos */}
      <section id="benefits" className="py-20 md:py-24 bg-card/50">
        <div className="container max-w-5xl">
          <div className="text-center space-y-3 mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Para quem usa</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Benefícios por público</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-7 border-border">
              <BookOpen className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-3">Para Estudantes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Prática segura sem consequências reais</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Aprendizado guiado por mentor virtual</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Portfólio inicial para o primeiro emprego</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Confiança ao entrar em um time real</li>
              </ul>
            </Card>
            <Card className="p-7 border-border">
              <Users className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-3">Para Educadores</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Complemento prático aos cursos</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Acompanhamento de progresso</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Conteúdos alinhados ao mercado</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Parcerias institucionais</li>
              </ul>
            </Card>
            <Card className="p-7 border-border">
              <Rocket className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-3">Para Empresas</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Onboarding mais rápido de júniores</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Curva de aprendizado reduzida</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Cenários customizáveis sob demanda</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />Banco de talentos qualificados</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA forte */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <Card className="p-10 md:p-14 text-center bg-gradient-to-br from-primary to-blue-700 text-primary-foreground border-0">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para sair da teoria?</h2>
            <p className="text-lg opacity-95 max-w-2xl mx-auto mb-8">
              Em poucos cliques você está dentro do seu primeiro time virtual, codificando tarefas reais com o Dev Sim ao seu lado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={handlePrimaryCta}
                className="bg-white text-primary hover:bg-white/90"
              >
                {product.pricing.cta.primary}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open(company.contact.instagram, "_blank")}
                className="bg-transparent text-primary-foreground border-white/40 hover:bg-white/10"
              >
                <Instagram className="mr-2 w-4 h-4" /> Siga {company.contact.instagramHandle}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Contato */}
      <section id="contact" className="py-20 bg-card/40">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Fale com a gente</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Entre em Contato</h2>
            <p className="text-muted-foreground text-lg">
              Quer parceria, demonstração ou tirar dúvidas? Estamos a um clique de distância.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Contato Direto</h3>
              </div>
              <a
                href={`mailto:${company.contact.email}`}
                className="text-primary hover:underline break-all"
              >
                {company.contact.email}
              </a>
              <p className="text-sm text-muted-foreground mt-3">Respondemos em até 2 dias úteis.</p>
            </Card>

            <Card className="p-7">
              <h3 className="text-lg font-semibold text-foreground mb-4">Redes Sociais</h3>
              <div className="flex items-center gap-3">
                <a
                  href={company.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Siga a DevSim Studios no Instagram"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400 text-white shadow-md transition-transform hover:scale-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <span className="text-sm text-muted-foreground">{company.contact.instagramHandle}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Acompanhe novidades, dicas de carreira e bastidores da plataforma.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="/manus-storage/pasted_file_db66k3_image_e35bcb12.png"
                  alt="DevSim"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-bold text-foreground">{company.name}</span>
              </div>
              <p className="text-sm text-muted-foreground">{company.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#product" className="hover:text-foreground transition">Funcionalidades</a></li>
                <li><a href="#access" className="hover:text-foreground transition">Como acessar</a></li>
                <li><a href="#benefits" className="hover:text-foreground transition">Benefícios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition">Sobre</a></li>
                <li><a href="#mvv" className="hover:text-foreground transition">M.V.V.</a></li>
                <li><a href="#team" className="hover:text-foreground transition">Equipe</a></li>
                <li><a href="#contact" className="hover:text-foreground transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Siga a DevSim</h4>
              <a
                href={company.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Siga a DevSim Studios no Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400 text-white shadow-md transition-transform hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <p className="text-xs text-muted-foreground mt-3">{company.contact.instagramHandle}</p>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-muted-foreground">
            <p>&copy; 2026 {company.name}. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <Shield className="w-4 h-4" /> <span>LGPD compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
