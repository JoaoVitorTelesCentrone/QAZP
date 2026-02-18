import { useState } from "react"
import { TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster } from "sonner"

type DeleteActionProps = {
  title: string
  description: string
  onDelete: () => void
  iconSize?: "sm" | "md"
}

export function DeleteAction({
  title,
  description,
  onDelete,
  iconSize = "sm",
}: DeleteActionProps) {
  const [open, setOpen] = useState(false)

  const iconSizeClass =
    iconSize === "sm" ? "h-4 w-4" : "h-5 w-5"

  return (
    <div>
      <Toaster richColors />

      <TrashIcon
        className={`cursor-pointer ${iconSizeClass}`}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white shadow-lg shadow-slate-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              {title}
            </h2>

            <p className="text-gray-700">
              {description}
            </p>

            <div className="justify-between">
              <Button
                onClick={() => {
                  onDelete()
                  setOpen(false)
                }}
                className="mt-6 px-4 py-2 mx-4 bg-red-950 text-white border-2 border-red-950 rounded hover:bg-red-950 hover:text-white hover:border-0"
              >
                Deletar
              </Button>

              <Button
                onClick={() => setOpen(false)}
                className="mt-6 mx-4 px-4 py-2 bg-white text-red-950 rounded hover:bg-white hover:text-red-950"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}