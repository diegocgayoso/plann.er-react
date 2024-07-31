import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface MembersInviteProps {
  emailsToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  closeModalMembers: () => void;
  removeEmails: (email: string) => void;
}

export function InviteMembersModal({
  addNewEmailToInvite,
  closeModalMembers,
  emailsToInvite,
  removeEmails,
}: MembersInviteProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button type="button" onClick={closeModalMembers}>
              <X className="size-5" />
            </button>
          </div>
          <small className="text-zinc-400 text-sm">
            Os convidades irão receber e-mails para confirmar a participação na
            viagem.
          </small>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 bg-zinc-800 flex items-center justify-between rounded-md"
              >
                <span className="text-zinc-300">{email}</span>
                <button type="button">
                  <X
                    className="size-4 text-zinc-400"
                    onClick={() => removeEmails(email)}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <div className="w-full h-px bg-zinc-800 my-4" />
        <form
          onSubmit={addNewEmailToInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex flex-1 items-center gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="text-zinc-950 size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
