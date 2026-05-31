"use client"

import React from "react"
import { motion } from "framer-motion"
import { Star, IndianRupee, Zap, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CompareButton } from "@/components/CompareButton"
import { Car } from "@/store/useCarStore"

interface CarCardProps {
  car: Car;
  index: number;
}

export function CarCard({ car, index }: CarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden border-none bg-card/70 shadow-2xl backdrop-blur-xl transition-all hover:translate-y-[-8px] hover:bg-card/90">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {car.body_type}
            </Badge>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {car.safety_rating}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {car.make} <span className="text-primary">{car.model}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow space-y-4">
          <div className="flex flex-wrap gap-4 text-sm font-medium text-foreground/80">
            <div className="flex items-center gap-1.5">
              <IndianRupee className="h-4 w-4 text-primary" />
              ₹{car.price_lakhs} L
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-primary" />
              {car.mileage_kmpl} {car.mileage_kmpl > 100 ? 'km range' : 'kmpl'}
            </div>
          </div>
          
          <div className="rounded-xl bg-background/40 p-4 border border-border/50">
            <p className="text-sm italic leading-relaxed text-foreground/90 line-clamp-3">
              "{car.ai_reason}"
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Key Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {car.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-foreground/70">
                  <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <CompareButton carId={car.id} />
        </CardFooter>
      </Card>
    </motion.div>
  )
}
