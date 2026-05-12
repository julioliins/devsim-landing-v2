import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  subject: "Quero conhecer o DevSim",
  message: "",
};

/**
 * Formulário de contato funcional.
 * Validação client-side simples + abertura de mailto: como fallback garantido.
 * (Em produção pode ser plugado a um endpoint tRPC para registrar no banco.)
 */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const validate = (): string | null => {
    if (!form.name.trim()) return "Por favor, informe seu nome.";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return "E-mail inválido.";
    if (!form.message.trim() || form.message.trim().length < 10)
      return "Conte um pouco mais sobre o que você precisa (mínimo 10 caracteres).";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSubmitting(true);

    const body = `Olá, equipe DevSim Studios!\n\nMeu nome é ${form.name} (${form.email}).\n\nAssunto: ${form.subject}\n\n${form.message}\n\n— Enviado pela landing page.`;
    const url = `mailto:devisim26@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;

    // Abre o cliente de e-mail e marca como enviado
    window.location.href = url;
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  if (sent) {
    return (
      <Card className="p-8 text-center border-primary/40 bg-primary/5">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/15 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Mensagem preparada!</h3>
        <p className="text-muted-foreground mb-4">
          Seu cliente de e-mail abriu com a mensagem pronta. Basta clicar em enviar.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setForm(initialState);
            setSent(false);
          }}
        >
          Enviar outra mensagem
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-7 md:p-8">
      <h3 className="text-xl font-bold text-foreground mb-1">Envie uma mensagem</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Preencha o formulário e entraremos em contato em até 2 dias úteis.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cf-name" className="block text-sm font-medium text-foreground mb-1.5">
              Nome
            </label>
            <input
              id="cf-name"
              type="text"
              required
              value={form.name}
              onChange={update("name")}
              placeholder="Seu nome"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label htmlFor="cf-email" className="block text-sm font-medium text-foreground mb-1.5">
              E-mail
            </label>
            <input
              id="cf-email"
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              placeholder="voce@email.com"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>
        <div>
          <label htmlFor="cf-subject" className="block text-sm font-medium text-foreground mb-1.5">
            Assunto
          </label>
          <select
            id="cf-subject"
            value={form.subject}
            onChange={update("subject")}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option>Quero conhecer o DevSim</option>
            <option>Sou estudante e quero testar</option>
            <option>Sou de uma instituição de ensino</option>
            <option>Sou de uma empresa</option>
            <option>Parceria / proposta comercial</option>
            <option>Suporte técnico</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-message" className="block text-sm font-medium text-foreground mb-1.5">
            Mensagem
          </label>
          <textarea
            id="cf-message"
            required
            rows={4}
            value={form.message}
            onChange={update("message")}
            placeholder="Conte como podemos ajudar..."
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          />
        </div>
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded">{error}</p>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 w-4 h-4" /> Entre em Contato
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
