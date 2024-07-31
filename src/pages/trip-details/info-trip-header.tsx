import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  ends_at: string;
  is_confirmed: boolean;
  starts_at: string;
}

export function InfoTripHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const initialDate = trip
    ? format(trip.starts_at, "d'/'LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d'/'LLL"))
    : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-between shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{initialDate} </span>
        </div>
        <div className="w-px h-6 bg-zinc-800" />
        <Button variant="secondary">
          {/* onClick={closeFieldMembers} */}
          Alterar local/data
          <Settings2 className="size-5 " />
        </Button>
      </div>
    </div>
  );
}
