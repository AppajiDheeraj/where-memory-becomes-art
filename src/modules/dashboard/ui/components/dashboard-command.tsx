import { CommandResponsiveDialog, CommandInput, CommandItem, CommandList, CommandGroup, CommandEmpty } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { BookOpen, Sparkles, Images, User } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // --------------------------
  // Dummy Data for LifeBuddy AI
  // --------------------------

  const dummyStories = [
    { id: "1", title: "Chapter 1: The Beginning" },
    { id: "2", title: "Chapter 2: A New Memory" },
    { id: "3", title: "Chapter 3: Reconnection" },
  ];

  const dummyCharacters = [
    { id: "1", name: "Dheeraj (Main Character)" },
    { id: "2", name: "Aanya (Best Friend)" },
    { id: "3", name: "Raghav (Sibling)" },
  ];

  const dummyInputs = [
    { id: "1", label: "WhatsApp Memories" },
    { id: "2", label: "Instagram Stories" },
    { id: "3", label: "Voice Notes Sync" },
  ];

  // --------------------------
  // Filtering
  // --------------------------

  const filteredStories = dummyStories.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCharacters = dummyCharacters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredInputs = dummyInputs.filter((i) =>
    i.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CommandResponsiveDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search stories, characters, or memories..."
        value={search}
        onValueChange={(val) => setSearch(val)}
      />

      <CommandList>
        {/* Stories */}
        <CommandGroup heading="Your Stories">
          {filteredStories.length === 0 ? (
            <CommandEmpty>No stories found</CommandEmpty>
          ) : (
            filteredStories.map((story) => (
              <CommandItem
                key={story.id}
                onSelect={() => router.push(`/stories/${story.id}`)}
              >
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{story.title}</span>
              </CommandItem>
            ))
          )}
        </CommandGroup>

        {/* Characters */}
        <CommandGroup heading="AI Characters">
          {filteredCharacters.length === 0 ? (
            <CommandEmpty>No characters found</CommandEmpty>
          ) : (
            filteredCharacters.map((character) => (
              <CommandItem
                key={character.id}
                onSelect={() => router.push(`/characters/${character.id}`)}
              >
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{character.name}</span>
              </CommandItem>
            ))
          )}
        </CommandGroup>

        {/* Memory Inputs */}
        <CommandGroup heading="Memory Inputs">
          {filteredInputs.length === 0 ? (
            <CommandEmpty>No memory sources found</CommandEmpty>
          ) : (
            filteredInputs.map((input) => (
              <CommandItem
                key={input.id}
                onSelect={() => router.push(`/memories/${input.id}`)}
              >
                <Images className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{input.label}</span>
              </CommandItem>
            ))
          )}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
