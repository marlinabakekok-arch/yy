"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Wallet, TrendingUp, Calendar } from "lucide-react"
import Header from "@/components/header"
import ClassDetail from "@/components/class-detail"
import LoginModal from "@/components/login-modal"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const [theme, setTheme] = useState<"blue" | "green">("blue")
  const { user } = useAuth()

  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      setCurrentDate(now.toLocaleDateString("id-ID", options))
    }

    updateDate()
    const interval = setInterval(updateDate, 60000)
    return () => clearInterval(interval)
  }, [])

  const classData = {
    name: "XI TJKT 1",
    studentCount: 22,
    weeklyFeePerStudent: 5000,
    totalWeeklyFee: 22 * 5000,
    totalFund: 1540000,
    totalExpenses: 340000,
    remainingFund: 1200000,
    expenses: [
      { id: 1, description: "Fotokopi Materi", amount: 50000, date: "2025-01-15" },
      { id: 2, description: "Kertas HVS", amount: 75000, date: "2025-01-10" },
      { id: 3, description: "Spidol Whiteboard", amount: 25000, date: "2025-01-08" },
      { id: 4, description: "Pembersih Kelas", amount: 40000, date: "2025-01-05" },
    ],
  }

  if (selectedClass) {
    return <ClassDetail classData={classData} onBack={() => setSelectedClass(null)} theme={theme} />
  }

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-all duration-500 ${
        theme === "blue"
          ? "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
          : "bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900"
      }`}
    >
      <Header onLoginClick={() => setShowLogin(true)} theme={theme} onThemeChange={setTheme} />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 dark:text-white mb-4 leading-tight px-4">
            SMK YPE SAMPANG
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-2 px-4">
            Sistem Pengelolaan Kas Kelas Digital
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{currentDate}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 sm:mb-12">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Total Siswa
              </CardTitle>
              <Users className={`h-4 w-4 ${theme === "blue" ? "text-blue-500" : "text-emerald-500"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                {classData.studentCount}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Siswa aktif</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Kas Mingguan
              </CardTitle>
              <Calendar className={`h-4 w-4 ${theme === "blue" ? "text-green-500" : "text-blue-500"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                Rp {classData.totalWeeklyFee.toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Per minggu</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Total Kas
              </CardTitle>
              <Wallet className={`h-4 w-4 ${theme === "blue" ? "text-purple-500" : "text-teal-500"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                Rp {classData.totalFund.toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Terkumpul</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Sisa Kas
              </CardTitle>
              <TrendingUp className={`h-4 w-4 ${theme === "blue" ? "text-emerald-500" : "text-indigo-500"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                Rp {classData.remainingFund.toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tersedia</p>
            </CardContent>
          </Card>
        </div>

        {/* Class Selection */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Pilih Kelas</h2>
          <div className="flex justify-center px-4">
            <Button
              onClick={() => setSelectedClass("XI TJKT 1")}
              className={`${
                theme === "blue"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              } text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              XI TJKT 1<Badge className="ml-2 bg-white/20 text-white">{classData.studentCount} siswa</Badge>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classData.expenses.slice(0, 3).map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 dark:text-white truncate">{expense.description}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(expense.date).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-red-600 dark:text-red-400 text-sm sm:text-base">
                      -Rp {expense.amount.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  )
}
