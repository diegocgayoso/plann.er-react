import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { ActiveMembers } from "./active-members";
import { CreateLinkModal } from "./create-new-link-modal";
import { InfoTripHeader } from "./info-trip-header";
import { Activites } from "./activites";
import { Button } from "../../components/button";

export function TripDetails() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  function openActivityModal() {
    setIsCreateActivityModalOpen(true);
  }
  function closeActivityModal() {
    setIsCreateActivityModalOpen(false);
  }
  // function openLinkModal() {
  //   setIsCreateLinkModalOpen(true);
  // }
  function closeLinkModal() {
    setIsCreateLinkModalOpen(false);
  }
  // function addNewActivity(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log("Activity :" + data);
  // }
  function addNewLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      {/* Header */}
      <InfoTripHeader />
      <main className="flex gap-16 px-4">
        {/* Eventos */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold ">Atividades</h2>
            <Button onClick={openActivityModal}>
              <Plus className="size-5 " />
              Cadastrar atividade
            </Button>
          </div>
          <Activites />
        </div>
        {/* Aside */}
        <div className="w-80 space-y-6">
          {/* Links */}
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800"></div>
          {/* Members */}
          <ActiveMembers />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeActivityModal}
        />
      )}
      {isCreateLinkModalOpen && (
        <CreateLinkModal
          closeCreateLinkModal={closeLinkModal}
          createLink={addNewLink}
        />
      )}
    </div>
  );
}
