"use client"

import { Button } from "@/components/ui/button"
import { Scale, CheckCircle2 } from "lucide-react"
import { useCarStore } from "@/store/useCarStore"
import { toast } from "sonner"

interface CompareButtonProps {
  carId: string;
}

export function CompareButton({ carId }: CompareButtonProps) {
  const toggleCompare = useCarStore((state) => state.toggleCompare)
  const isSelected = useCarStore((state) => state.selectedForCompare.includes(carId))
  const count = useCarStore((state) => state.selectedForCompare.length)
  const isLimitReached = count >= 3 && !isSelected

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isLimitReached) {
      toast.error("Comparison limit reached! Max 3 cars.")
      return
    }

    toggleCompare(carId)
    
    if (!isSelected) {
      if (count === 0) {
        toast.info("Select 1 more car to compare.")
      } else {
        toast.success("Added to Comparison Hub.")
      }
    } else {
      toast("Removed from comparison.")
    }
  }

  return (
    <Button 
      onClick={handleToggle}
      variant={isSelected ? "default" : "outline"}
      className={`w-full gap-2 rounded-xl border-primary/20 transition-all duration-300 relative group/btn ${
        isSelected 
        ? "bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]" 
        : "hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_rgba(var(--primary),0.15)]"
      } ${isLimitReached ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10" />

      {isSelected ? (
        <>
          <CheckCircle2 className="h-4 w-4 animate-in zoom-in" />
          <span>Selected</span>
        </>
      ) : (
        <>
          <Scale className={`h-4 w-4 ${isLimitReached ? "text-muted-foreground" : "text-primary"}`} />
          <span>{isLimitReached ? "Limit Reached" : "Add to Compare"}</span>
        </>
      )}
    </Button>
  )
}
