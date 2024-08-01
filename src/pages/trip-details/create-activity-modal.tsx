import { Calendar, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
interface CreateActivityProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityProps) {
  const { tripId } = useParams()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title_activity")?.toString();
    const occurs_at = data.get("date_activity")?.toString();
    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    });
    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button type="button" onClick={closeCreateActivityModal}>
              <X className="size-5" />
            </button>
          </div>
          <small className="text-zinc-400 text-sm">
            Todos convidados podem visualizar as atividades.
          </small>
        </div>
        <form onSubmit={createActivity} className="space-y-2">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title_activity"
              placeholder="Qual o rolê?"
              className="bg-transparent placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="flex item-center gap-2">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-1 items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="date_activity"
                placeholder="Que dia?"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              />
            </div>
          </div>
          <Button type="submit" variant="primary" size="full">
            Salvar rolê
          </Button>
        </form>
      </div>
    </div>
  );
}
