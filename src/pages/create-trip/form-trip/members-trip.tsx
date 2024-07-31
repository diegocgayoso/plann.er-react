import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";
interface FieldMembersProps {
  openModalMembers: () => void;
  emailsToInvite: string[];
  openConfirmTripModal: () => void;
}

export function FieldMembers({
  emailsToInvite,
  openConfirmTripModal,
  openModalMembers,
}: FieldMembersProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type="button" onClick={openModalMembers} className="flex items-center gap-2 flex-1 text-left">
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span>{emailsToInvite.length} pessoas convidadas</span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1">
            Quem vai na trip?
          </span>
        )}
      </button>
      <div className="w-px h-6 bg-zinc-800" />
      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="text-zinc-950 size-5" />
      </Button>
    </div>
  );
}
