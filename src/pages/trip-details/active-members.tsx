import { CircleDashed, CircleCheck, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function ActiveMembers() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participants[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-zinc-50">Membros</h2>
      {participants.map((participant, index) => {
        return (
          <div key={participant.id} className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5 ">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate ">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CircleCheck className="size-5 text-lime-400 shrink-0" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400 shrink-0" />
              )}
            </div>
          </div>
        );
      })}

      <Button variant="secondary" size="full">
        <UserCog className="size-5 " />
        Gerenciar Membros
      </Button>
    </div>
  );
}
