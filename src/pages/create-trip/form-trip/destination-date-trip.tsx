import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";

interface DestinationAndDateFieldsProps {
  isFieldMembersOpen: boolean;
  eventStartAndEndDates: DateRange | undefined
  closeFieldMembers: () => void;
  openFieldMembers: () => void;
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateFields({
  closeFieldMembers,
  isFieldMembersOpen,
  openFieldMembers,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates
}: DestinationAndDateFieldsProps) {
  const [isDatePickerOpen, setIsDAtePickerOpen] = useState(false);

  function openDatePicker() {
    return setIsDAtePickerOpen(true);
  }
  function closeDatePicker() {
    return setIsDAtePickerOpen(false);
  }

  const initialDate =
    eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d'/'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d'/'LLL"))
      : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isFieldMembersOpen}
          type="text"
          placeholder="Para onde você vai?"
          onChange={event => setDestination(event.target.value)}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        />
      </div>
      <button
        onClick={openDatePicker}
        disabled={isFieldMembersOpen}
        className="flex items-center gap-2 w-min text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="bg-transparent text-lg text-zinc-400 w-40">
          {initialDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione data</h2>
                <button type="button" onClick={closeDatePicker}>
                  <X className="size-5" />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />
      {isFieldMembersOpen ? (
        <Button onClick={closeFieldMembers} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5 " />
        </Button>
      ) : (
        <Button onClick={openFieldMembers}>
          Continuar
          <ArrowRight className=" size-5" />
        </Button>
      )}
    </div>
  );
}
