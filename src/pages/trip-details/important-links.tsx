import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface CreateLinkProps {
  openCreateLinkModal: () => void;
}
interface Links {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks({
  openCreateLinkModal
}: CreateLinkProps) {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Links[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-zinc-50">Links Importantes</h2>
    {links.length === 0 && (
      <p>Ainda não existe links cadastrados</p>
    )}
      {links.map((link) => {
        return (
          <div key={link.id} className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5 ">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href="#"
                  className="block text-sm text-zinc-400 truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="size-5 text-zinc-400 shrink-0 " />
            </div>
          </div>
        );
      })}

      <Button onClick={openCreateLinkModal} variant="secondary" size="full">
        <Plus className="size-5 " />
        Cadastrar novo link
      </Button>
    </div>
  );
}
