import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, ChevronDown, Loader2, Mail, MessageCircle, Phone, Star, CheckCircle2 } from "lucide-react";
import { useSupport } from "@/hooks/useSupport";
import { toast } from "sonner";

export default function SupportSettings() {
  const { faqEntries, tickets, submitTicket, submitRating, isSubmittingTicket, isSubmittingRating } = useSupport();
  const [activeTab, setActiveTab] = useState<"faq" | "contact" | "about" | "rating">("faq");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    channel: "email" as "email" | "chat" | "whatsapp",
  });
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactForm.subject || !contactForm.message) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      await submitTicket({
        subject: contactForm.subject,
        message: contactForm.message,
        channel: contactForm.channel,
      });
      setSubmitSuccess(true);
      setContactForm({ subject: "", message: "", channel: "email" });
      toast.success("Mensagem enviada com sucesso!");
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      toast.error("Erro ao enviar mensagem");
    }
  };

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      toast.error("Selecione uma classificação");
      return;
    }

    try {
      await submitRating({
        rating,
        comment: ratingComment,
      });
      setRating(0);
      setRatingComment("");
      toast.success("Obrigado pela sua avaliação!");
    } catch (error) {
      toast.error("Erro ao enviar avaliação");
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab("faq")}
          className={`px-4 py-2 font-medium text-sm transition whitespace-nowrap ${
            activeTab === "faq"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          FAQ
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-2 font-medium text-sm transition whitespace-nowrap ${
            activeTab === "contact"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Fale Conosco
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-2 font-medium text-sm transition whitespace-nowrap ${
            activeTab === "about"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sobre o Sistema
        </button>
        <button
          onClick={() => setActiveTab("rating")}
          className={`px-4 py-2 font-medium text-sm transition whitespace-nowrap ${
            activeTab === "rating"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Avaliação
        </button>
      </div>

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="space-y-3">
          {faqEntries && faqEntries.length > 0 ? (
            faqEntries.map((item, index) => (
              <Card key={item.id} className="border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition"
                >
                  <h4 className="font-medium text-foreground text-left">{item.question}</h4>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="p-4 border-t border-border bg-muted/30">
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Nenhuma pergunta frequente disponível</p>
          )}
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Fale Conosco</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Tem dúvidas ou sugestões? Entre em contato conosco através do formulário abaixo.
          </p>

          {submitSuccess && (
            <div className="flex gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-800 dark:text-green-200">
                Mensagem enviada! Entraremos em contato em breve.
              </p>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Label htmlFor="subject">Assunto</Label>
              <Input
                id="subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="Qual é o assunto da sua mensagem?"
                disabled={isSubmittingTicket}
              />
            </div>
            <div>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Descreva seu problema ou sugestão..."
                rows={5}
                className="resize-none"
                disabled={isSubmittingTicket}
              />
            </div>
            <div>
              <Label htmlFor="channel">Canal de Contato</Label>
              <Select
                value={contactForm.channel}
                onValueChange={(value) =>
                  setContactForm({ ...contactForm, channel: value as "email" | "chat" | "whatsapp" })
                }
              >
                <SelectTrigger id="channel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      E-mail
                    </div>
                  </SelectItem>
                  <SelectItem value="chat">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </div>
                  </SelectItem>
                  <SelectItem value="whatsapp">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      WhatsApp
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isSubmittingTicket} className="w-full">
              {isSubmittingTicket ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Mensagem"
              )}
            </Button>
          </form>

          {/* Tickets */}
          {tickets && tickets.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">Seus Tickets</h4>
              <div className="space-y-2">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="p-3 border border-border rounded-lg text-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-foreground">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "resolved"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                            : ticket.status === "in_progress"
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                              : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {ticket.status === "resolved"
                          ? "Resolvido"
                          : ticket.status === "in_progress"
                            ? "Em Progresso"
                            : "Aberto"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* About Tab */}
      {activeTab === "about" && (
        <div className="space-y-4">
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sobre o DevSim Studios</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-1">Nome do Sistema</h4>
                <p>DevSim Studios - Simuladores para Desenvolvimento de Software</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Versão</h4>
                <p>2.0.0</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Desenvolvedor</h4>
                <p>DevSim Studios Team</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Descrição</h4>
                <p>
                  Plataforma educacional que oferece simuladores realistas para prática de desenvolvimento de software. Ambiente seguro para aprender, experimentar e crescer profissionalmente.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Tecnologias</h4>
                <p>React 19, TypeScript, Tailwind CSS 4, tRPC, Express.js, MySQL</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border bg-blue-50 dark:bg-blue-950">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Links Úteis
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>
                    <a href="#" className="hover:underline">
                      Política de Privacidade
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Termos de Uso
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Documentação
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Rating Tab */}
      {activeTab === "rating" && (
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Avalie o DevSim Studios</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Sua opinião é importante para nós! Avalie sua experiência com a plataforma.
          </p>

          <div className="space-y-6">
            <div>
              <Label className="mb-3 block">Classificação (1-5 estrelas)</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Comentário (opcional)</Label>
              <Textarea
                id="comment"
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="Compartilhe sua experiência..."
                rows={4}
                className="resize-none"
                disabled={isSubmittingRating}
              />
            </div>

            <Button
              onClick={handleRatingSubmit}
              disabled={isSubmittingRating || rating === 0}
              className="w-full"
            >
              {isSubmittingRating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Avaliação"
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
