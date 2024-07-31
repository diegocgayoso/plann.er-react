import { Link2, Tag, X } from "lucide-react";
import { FormEvent } from "react";
interface CreateLinkModalProps {
    closeCreateLinkModal: () => void;
    createLink: (event: FormEvent<HTMLFormElement>)=> void;
}
export function CreateLinkModal({closeCreateLinkModal,createLink}: CreateLinkModalProps){
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Cadastrar link</h2>
                <button type="button" onClick={closeCreateLinkModal}>
                  <X className="size-5" />
                </button>
              </div>
              <small className="text-zinc-400 text-sm">
                Todos convidados podem visualizar os links importantes.
              </small>
            </div>
            {/* <div className="flex flex-wrap gap-2"></div> */}
            <form onSubmit={createLink} className="space-y-2">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className="size-5 text-zinc-400" />
                <input
                  name="activity"
                  placeholder="Título do link"
                  className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <div className="flex item-center gap-2">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-1 items-center gap-2">
                  <Link2 className="size-5 text-zinc-400" />
                  <input
                    type="url"
                    name="date_activity"
                    placeholder="URL?"
                    className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                  />
                </div>
                
              </div>
    
              <button
                type="submit"
                className="bg-lime-300 text-lime-950 opacity-60 rounded-lg px-5 h-10 font-medium flex items-center justify-center gap-2 hover:opacity-100 w-full"
              >
                Salvar link
              </button>
            </form>
          </div>
        </div>
      );
}