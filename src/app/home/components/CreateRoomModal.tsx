import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const schema = z.object({
  name: z.string().min(1, "Room name is required"),
  room_type: z.enum(["audio", "video"], {
    required_error: "Room type is required",
  }),
  interests: z.array(z.string()).min(1, "At least one interest is required"),
  privacy: z.enum(["public", "private"]),
});

type FormData = z.infer<typeof schema>;

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: FormData) => void;
}

const interestOptions = [
  {
    id: "dbac4910-103d-421d-a51d-3a1dbd2720f0",
    name: "Book",
  },
  {
    id: "6ee6d0d8-69eb-4655-a40a-3c467c63279f",
    name: "Eating",
  },
];

const MultiSelectInterests = ({
  selected,
  onChange,
  options,
  error,
}: {
  selected: string[];
  onChange: (value: string[]) => void;
  options: typeof interestOptions;
  error?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    onChange(newSelected);
  };

  const handleRemoveChip = (idToRemove: string) => {
    onChange(selected.filter((id) => id !== idToRemove));
  };

  const handleSelectAll = () => {
    const allIds = options.map((option) => option.id);
    onChange(allIds);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-2">
      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        >
          {selected.length === 0 ? (
            <span className="text-gray-500">Select interests...</span>
          ) : (
            <span className="text-gray-900">
              {selected.length} interest{selected.length !== 1 ? "s" : ""}{" "}
              selected
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {/* Select All / Clear All */}
            <div className="px-3 py-2 border-b border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear All
              </button>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-auto">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(option.id)}
                >
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.includes(option.id)}
                      onChange={() => {}}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-900">{option.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Interests Chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((id) => {
            const option = options.find((opt) => opt.id === id);
            return (
              <div
                key={id}
                className="flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm group"
              >
                <span>{option?.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveChip(id)}
                  className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${option?.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export const CreateRoomModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateRoomModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      privacy: "public",
      room_type: "audio",
      interests: [],
    },
  });

  const onSubmit = (data: FormData) => {
    onCreate(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Create a New Room
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Set up a space for your conversations
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Room Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter room name"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Room Mode
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  value="audio"
                  {...register("room_type")}
                  id="audio"
                  className="peer hidden"
                />
                <label
                  htmlFor="audio"
                  className="flex items-center justify-center w-full p-4 text-gray-700 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 hover:bg-gray-50"
                >
                  <div className="block">
                    <div className="font-semibold">Audio Room</div>
                    <div className="text-sm text-gray-500">
                      Voice conversations only
                    </div>
                  </div>
                </label>
              </div>
              <div className="relative flex items-center">
                <input
                  type="radio"
                  value="video"
                  {...register("room_type")}
                  id="video"
                  className="peer hidden"
                />
                <label
                  htmlFor="video"
                  className="flex items-center justify-center w-full p-4 text-gray-700 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 hover:bg-gray-50"
                >
                  <div className="block">
                    <div className="font-semibold">Video Room</div>
                    <div className="text-sm text-gray-500">
                      Video and audio enabled
                    </div>
                  </div>
                </label>
              </div>
            </div>
            {errors.room_type && (
              <p className="text-sm text-red-600 mt-1">
                {errors.room_type.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Interests
            </Label>
            <MultiSelectInterests
              selected={watch("interests")}
              onChange={(value) => setValue("interests", value)}
              options={interestOptions}
              error={errors.interests?.message}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Room privacy
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  value="public"
                  {...register("privacy")}
                  id="public"
                  className="peer hidden"
                />
                <label
                  htmlFor="public"
                  className="flex items-center justify-center w-full p-4 text-gray-700 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 hover:bg-gray-50"
                >
                  <div className="block">
                    <div className="font-semibold">Public</div>
                    <div className="text-sm text-gray-500">Anyone can join</div>
                  </div>
                </label>
              </div>
              <div className="relative flex items-center">
                <input
                  type="radio"
                  value="private"
                  {...register("privacy")}
                  id="private"
                  className="peer hidden"
                />
                <label
                  htmlFor="private"
                  className="flex items-center justify-center w-full p-4 text-gray-700 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-600 hover:bg-gray-50"
                >
                  <div className="block">
                    <div className="font-semibold">Private</div>
                    <div className="text-sm text-gray-500">Invite only</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Create Room
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
