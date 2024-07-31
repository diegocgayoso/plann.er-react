import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteMembersModal } from "./invite-members-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateFields } from "./form-trip/destination-date-trip";
import { FieldMembers } from "./form-trip/members-trip";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTrip() {
  const navigate = useNavigate();

  const [isFieldMembersOpen, setIsFieldMembersOpen] = useState(false);
  const [isModalMembersOpen, setIsModalMembersOpen] = useState(false);
  const [isConfirmTripModalOpen, setConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState(["diegoc@members.com"]);
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  function openFieldMembers() {
    setIsFieldMembersOpen(true);
  }
  function closeFieldMembers() {
    setIsFieldMembersOpen(false);
  }
  function openModalMembers() {
    setIsModalMembersOpen(true);
  }
  function closeModalMembers() {
    setIsModalMembersOpen(false);
  }
  function openConfirmTripModal() {
    setConfirmTripModalOpen(true);
  }
  function closeConfirmTripModal() {
    setConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);
    event.currentTarget.reset();
  }

  function removeEmails(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/public/logo.svg" alt="plann.er" className="" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateFields
            closeFieldMembers={closeFieldMembers}
            isFieldMembersOpen={isFieldMembersOpen}
            openFieldMembers={openFieldMembers}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isFieldMembersOpen && (
            <FieldMembers
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openModalMembers={openModalMembers}
            />
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade.
          </a>{" "}
        </p>
      </div>
      {isModalMembersOpen && (
        <InviteMembersModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeModalMembers={closeModalMembers}
          removeEmails={removeEmails}
        />
      )}
      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
