"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCarStore } from "@/store/useCarStore"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { 
  X, 
  Scale, 
  Star, 
  IndianRupee, 
  Zap, 
  ShieldCheck, 
  Car, 
  ListChecks,
  ChevronUp,
  ChevronDown,
  Trash2
} from "lucide-react"

export function ComparisonTable() {
  const { 
    selectedForCompare, 
    allCars, 
    toggleCompare, 
    resetCompare, 
    isCompareMinimized, 
    setCompareMinimized 
  } = useCarStore()

  const selectedCars = allCars.filter((car) =>
    selectedForCompare.includes(car.id)
  )

  const isVisible = selectedForCompare.length >= 2

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isCompareMinimized ? "calc(100% - 60px)" : 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[70] p-4 pointer-events-none"
        >
          <div className="mx-auto max-w-6xl rounded-t-3xl border bg-card/95 p-4 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)] backdrop-blur-xl pointer-events-auto">
            {/* Header Area */}
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Comparison Hub</h3>
                  <p className="text-xs text-muted-foreground">{selectedForCompare.length} of 3 cars selected</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCompareMinimized(!isCompareMinimized)}
                  className="rounded-full hover:bg-primary/5 text-foreground"
                >
                  {isCompareMinimized ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetCompare}
                  className="gap-2 border-destructive/20 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {!isCompareMinimized && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden rounded-2xl border bg-background/40"
                >
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-b-2">
                          <TableHead className="w-[180px] bg-muted/30 font-bold uppercase tracking-wider text-[10px] text-foreground">Specifications</TableHead>
                          {selectedCars.map((car) => (
                            <TableHead key={car.id} className="min-w-[200px] py-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold text-primary uppercase tracking-tighter">{car.make}</span>
                                <span className="text-base font-bold leading-tight text-foreground">{car.model}</span>
                                <button
                                  onClick={() => toggleCompare(car.id)}
                                  className="mt-2 flex items-center gap-1 text-[10px] font-medium text-destructive transition-colors hover:text-destructive/80"
                                >
                                  <X className="h-3 w-3" /> Remove
                                </button>
                              </div>
                            </TableHead>
                          ))}
                          {Array.from({ length: 3 - selectedCars.length }).map((_, i) => (
                            <TableHead key={`empty-h-${i}`} className="min-w-[200px] border-l border-dashed opacity-30">
                              <div className="flex flex-col items-center justify-center py-4">
                                <div className="mb-1 rounded-full border-2 border-dashed p-2">
                                  <Scale className="h-4 w-4" />
                                </div>
                                <span className="text-[10px] font-medium text-foreground">Add more</span>
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-primary/5">
                          <TableCell className="font-semibold text-sm bg-muted/10 text-foreground">
                            <div className="flex items-center gap-2">
                              <IndianRupee className="h-4 w-4 text-primary" /> Price
                            </div>
                          </TableCell>
                          {selectedCars.map((car) => (
                            <TableCell key={car.id} className="font-bold text-lg text-foreground">₹{car.price_lakhs} L</TableCell>
                          ))}
                          {Array.from({ length: 3 - selectedCars.length }).map((_, i) => (
                            <TableCell key={`empty-p-${i}`} className="border-l border-dashed" />
                          ))}
                        </TableRow>
                        <TableRow className="hover:bg-primary/5">
                          <TableCell className="font-semibold text-sm bg-muted/10 text-foreground">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-primary" /> Efficiency
                            </div>
                          </TableCell>
                          {selectedCars.map((car) => (
                            <TableCell key={car.id} className="text-foreground">
                              {car.mileage_kmpl} {car.mileage_kmpl > 100 ? 'km range' : 'kmpl'}
                            </TableCell>
                          ))}
                          {Array.from({ length: 3 - selectedCars.length }).map((_, i) => (
                            <TableCell key={`empty-m-${i}`} className="border-l border-dashed" />
                          ))}
                        </TableRow>
                        <TableRow className="hover:bg-primary/5">
                          <TableCell className="font-semibold text-sm bg-muted/10 text-foreground">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4 text-primary" /> Safety
                            </div>
                          </TableCell>
                          {selectedCars.map((car) => (
                            <TableCell key={car.id}>
                              <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 w-fit">
                                <span className="font-bold text-primary">{car.safety_rating}</span>
                                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                              </div>
                            </TableCell>
                          ))}
                          {Array.from({ length: 3 - selectedCars.length }).map((_, i) => (
                            <TableCell key={`empty-s-${i}`} className="border-l border-dashed" />
                          ))}
                        </TableRow>
                        <TableRow className="hover:bg-primary/5">
                          <TableCell className="font-semibold text-sm bg-muted/10 text-foreground">
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4 text-primary" /> Type
                            </div>
                          </TableCell>
                          {selectedCars.map((car) => (
                            <TableCell key={car.id} className="text-foreground">{car.body_type}</TableCell>
                          ))}
                          {Array.from({ length: 3 - selectedCars.length }).map((_, i) => (
                            <TableCell key={`empty-b-${i}`} className="border-l border-dashed" />
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
