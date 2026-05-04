import { useState, useRef, useEffect } from "react";
import { useSearch, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Zap, Award, ChevronLeft, Clock, Target, Code2 } from "lucide-react";
import TaskCodeEditor from "@/components/simulator/TaskCodeEditor";
import {
  SIMULATOR_TASKS,
  type TaskDefinition,
} from "@/data/simulatorTasks";

interface Message {
  id: string;
  sender: "user" | "npc";
  content: string;
  timestamp: Date;
  type?: "task" | "feedback" | "curiosity";
}

export default function SimulatorEnvironment() {
  const [, setLocation] = useLocation();
  const query = useSearch();
  const careerId = new URLSearchParams(query).get("career");
  const methodology = new URLSearchParams(query).get("methodology");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "npc",
      content: "Bem-vindo ao time! Sou seu chefe nesta simulação. Vamos começar com algumas tarefas?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentTask, setCurrentTask] = useState<TaskDefinition | null>(null);
  const [completedTaskIds, setCompletedTaskIds] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tasks: TaskDefinition[] = SIMULATOR_TASKS;

  const npcProfile = {
    name: "Marina Silva",
    role: "Tech Lead",
    avatar: "👩‍💼",
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate NPC response
    setTimeout(() => {
      const responses = [
        "Ótimo! Você está no caminho certo.",
        "Interessante abordagem. Vamos discutir isso na próxima reunião.",
        "Excelente! Você completou essa tarefa com sucesso!",
        "Hmm, deixe-me pensar sobre isso...",
      ];
      const npcMessage: Message = {
        id: Date.now().toString(),
        sender: "npc",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, npcMessage]);
    }, 800);
  };

  const handleCompleteTask = (task: TaskDefinition) => {
    // Evita duplicar pontos se o usuário concluir a mesma tarefa duas vezes
    if (completedTaskIds.includes(task.id)) {
      setCurrentTask(null);
      return;
    }
    setScore((prev) => prev + task.points);
    setCompletedTaskIds((prev) => [...prev, task.id]);
    setCurrentTask(null);

    const completionMessage: Message = {
      id: Date.now().toString(),
      sender: "npc",
      content: `Parabéns! Você completou "${task.title}" e ganhou ${task.points} pontos! 🎉`,
      timestamp: new Date(),
      type: "feedback",
    };
    setMessages((prev) => [...prev, completionMessage]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/simulator/careers")}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Simulador de Carreira</h1>
                <p className="text-sm text-muted-foreground">
                  {methodology === "agile" ? "Metodologia Ágil" : "Metodologia Cascata"}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-mono">{formatTime(sessionTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold">{score} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area + Editor de Tarefa */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="flex-1 flex flex-col">
            {/* NPC Profile */}
            <div className="p-6 border-b border-border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{npcProfile.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{npcProfile.name}</h3>
                  <p className="text-sm text-muted-foreground">{npcProfile.role}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-muted-foreground rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-6 border-t border-border">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>

          {/* Editor de Tarefa Atual */}
          {currentTask ? (
            <TaskCodeEditor
              task={currentTask}
              onComplete={handleCompleteTask}
              onClose={() => setCurrentTask(null)}
            />
          ) : (
            <Card className="p-6 border-dashed bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    Escolha uma tarefa ao lado para começar
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ao selecionar, um editor de código aparece aqui com os
                    requisitos da tarefa. Escreva sua solução, clique em{" "}
                    <span className="font-medium text-foreground">Verificar</span>{" "}
                    e receba feedback imediato sobre o que ainda precisa
                    ajustar antes de submeter.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Tasks Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Available Tasks */}
          <Card className="p-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Tarefas Disponíveis
            </h3>
            <div className="space-y-3">
              {tasks.map((task) => {
                const isCompleted = completedTaskIds.includes(task.id);
                const isCurrent = currentTask?.id === task.id;
                return (
                  <button
                    key={task.id}
                    type="button"
                    className={`w-full text-left p-4 border rounded-lg transition ${
                      isCurrent
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : isCompleted
                          ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900/50"
                          : "border-border hover:bg-muted cursor-pointer"
                    }`}
                    onClick={() => setCurrentTask(task)}
                  >
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h4 className="font-semibold text-sm text-foreground">
                        {task.title}
                      </h4>
                      <Badge
                        variant={
                          task.difficulty === "easy"
                            ? "default"
                            : task.difficulty === "medium"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs shrink-0"
                      >
                        {task.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                        +{task.points} pts
                      </span>
                      <Badge
                        variant={isCompleted ? "default" : "outline"}
                        className={`text-xs ${isCompleted ? "bg-emerald-500 hover:bg-emerald-500 border-0" : ""}`}
                      >
                        {isCompleted
                          ? "Concluída"
                          : isCurrent
                            ? "Em progresso"
                            : "Pendente"}
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Curiosity */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-0">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Curiosidade
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Você sabia? A metodologia Ágil surgiu em 2001 com o Manifesto Ágil, revolucionando a forma como os times
              desenvolvem software.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
