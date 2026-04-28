import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";

export type YoutubePlayerProps = {
  title: string;
  youtubeId: string;
  duration?: string;
};

/**
 * YoutubePlayer — thumb clicável que abre um Modal com iframe embedado
 * para garantir que o usuário assista o conteúdo sem sair do portal DevSim.
 */
export default function YoutubePlayer({ title, youtubeId, duration }: YoutubePlayerProps) {
  const [open, setOpen] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-xl border border-border bg-slate-900 text-left transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`Assistir ${title}`}
      >
        <div className="relative aspect-video w-full">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition group-hover:bg-black/30">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
              <Play className="h-7 w-7 fill-primary text-primary" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-slate-900 px-4 py-3">
          <span className="text-sm font-medium text-white line-clamp-1">{title}</span>
          {duration && (
            <span className="flex items-center gap-1 text-xs text-slate-300">
              <Clock className="h-3 w-3" />
              {duration}
            </span>
          )}
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-[92vw] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-5 pb-3 border-b">
            <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full bg-black">
            {open && (
              <iframe
                title={title}
                src={embedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
          <div className="flex items-center justify-between gap-3 px-6 py-4 bg-muted/40">
            <p className="text-xs text-muted-foreground">
              Vídeo embedado do YouTube — você pode assistir sem sair do portal DevSim.
            </p>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
