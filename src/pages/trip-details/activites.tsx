import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function Activites() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map((category) => {
        return (
          <div key={category.date} className="space-y-2.5">
            <div  className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-zinc-300">
                Dia {format(category.date, "d")}
              </span>
              <span className="text-zinc-500">
                {format(category.date, "EEEE", { locale: ptBR })}
              </span>
            </div>
            {category.activities.length > 0 ? (
              <div >
                {category.activities.map((activity) => {
                  return (
                    <div key={activity.id} className="h-10 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape flex items-center gap-3">
                      <CircleCheck className="size-5 text-lime-300" />
                      <span className="text-zinc-100">{activity.title}</span>
                      <span className="text-zinc-400 text-sm ml-auto">{format(activity.occurs_at,'HH:mm')}h</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-zinc-500">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
