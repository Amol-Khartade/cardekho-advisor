"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, Star, IndianRupee, Zap, Shield, Scale, ChevronRight } from "lucide-react"
import { useCarStore } from "@/store/useCarStore"
import { ThemeToggle } from "@/components/theme-toggle"
import { ComparisonTable } from "@/components/ComparisonTable"
import { Input as CustomInput } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CompareButton } from "@/components/CompareButton"
import { CarCard } from "@/components/CarCard"

export default function CarAdvisorPage() {
  const { 
    userQuery, 
    setUserQuery, 
    recommendedCars, 
    setRecommendedCars, 
    isLoading, 
    setIsLoading,
    setAllCars,
    selectedForCompare,
    toggleCompare
  } = useCarStore()

  const [searchValue, setSearchValue] = useState("")

  React.useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const response = await fetch("/api/cars")
        const data = await response.json()
        setAllCars(data)
      } catch (error) {
        console.error("Failed to fetch all cars:", error)
      }
    }
    fetchAllCars()
  }, [setAllCars])

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!searchValue.trim()) return

    setIsLoading(true)
    setUserQuery(searchValue)

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchValue }),
      })
      const data = await response.json()
      setRecommendedCars(data.recommendations || [])
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-sans selection:bg-primary/30">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      {/* Header */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              CarDekho <span className="text-primary">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl"
            >
              Find Your <span className="text-primary">Dream Car.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground"
            >
              Describe your lifestyle, budget, and needs. Our AI consultant will find the perfect match from the Indian market.
            </motion.p>

            {/* Search Bar */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSearch}
              className="relative mx-auto max-w-2xl"
            >
              <div className="group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-orange-400 opacity-25 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200 animate-pulse" />
                <div className="relative flex items-center">
                  <CustomInput
                    type="text"
                    placeholder="e.g. A safe SUV for family trips under 15 lakhs..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="h-16 rounded-2xl border-none bg-card px-6 text-lg shadow-xl focus-visible:ring-2 focus-visible:ring-primary"
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isLoading}
                    className="absolute right-2 h-12 rounded-xl bg-primary px-6 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 group/search"
                  >
                    <div className="absolute inset-0 rounded-xl bg-primary/40 blur-lg opacity-0 group-hover/search:opacity-100 transition-opacity duration-300 -z-10" />
                    {isLoading ? "Analyzing..." : "Search"}
                  </Button>
                </div>
              </div>
            </motion.form>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                // Loading Skeletons
                Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card className="overflow-hidden border-none bg-card/50 backdrop-blur-xl">
                      <Skeleton className="h-48 w-full" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : recommendedCars.length > 0 ? (
                recommendedCars.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))
              ) : userQuery ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="col-span-full py-20 text-center"
                >
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Search className="h-10 w-10 text-primary opacity-50" />
                  </div>
                  <h3 className="text-2xl font-bold">No perfect matches found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or price range.</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Floating UI Feedback */}
      <AnimatePresence>
        {selectedForCompare.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-full bg-black/90 px-6 py-3 text-white shadow-2xl backdrop-blur-md">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-sm font-medium">Select 1 more car to start comparison</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ComparisonTable />
    </div>
  )
}
