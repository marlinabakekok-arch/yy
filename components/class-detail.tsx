"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Edit2, Trash2, Users, CheckCircle, XCircle, Settings, BarChart3 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Student {
  id: number
  name: string
  nis: string
  hasPaid: boolean
  lastPayment: string
}

interface Expense {
  id: number
  description: string
  amount: number
  date: string
}

interface ClassData {
  name: string
  studentCount: number
  weeklyFeePerStudent: number
  totalWeeklyFee: number
  totalFund: number
  totalExpenses: number
  remainingFund: number
  expenses: Expense[]
}

interface ClassDetailProps {
  classData: ClassData
  onBack: () => void
  theme?: "blue" | "green"
}

export default function ClassDetail({ classData, onBack, theme = "blue" }: ClassDetailProps) {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState<Expense[]>(classData.expenses)
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "AFRIDA DWI MUSRIATUN", nis: "2024001", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 2, name: "ALFA IZAH DENOK TRIANINGRUM", nis: "2024002", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 3, name: "ALISYA RIZKI SAFITRI", nis: "2024003", hasPaid: false, lastPayment: "2025-01-08" },
    { id: 4, name: "ARYA GUSTI PURNIAWAN", nis: "2024004", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 5, name: "AUFA MARLIND JUNIVER", nis: "2024005", hasPaid: false, lastPayment: "2025-01-08" },
    { id: 6, name: "AZKIA DINI SALWANA", nis: "2024006", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 7, name: "AZZAHRA AURORA PARAMADHITA", nis: "2024007", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 8, name: "CAHYANI UNTARI", nis: "2024008", hasPaid: false, lastPayment: "2025-01-08" },
    { id: 9, name: "DIAN FITRIANINGSIH", nis: "2024009", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 10, name: "ELMA AMELIA", nis: "2024010", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 11, name: "GILANG PRASETYO", nis: "2024011", hasPaid: false, lastPayment: "2025-01-08" },
    { id: 12, name: "IBNU VINSA MAULANA", nis: "2024012", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 13, name: "INAN DIYA'UL KHAWA", nis: "2024013", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 14, name: "MUHAMMAD AZRIL ADZANI", nis: "2024014", hasPaid: false, lastPayment: "2025-01-08" },
    { id: 15, name: "NABILA ELFIRA RIANTI", nis: "2024015", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 16, name: "NUR AQLI DERMAWAN", nis: "2024016", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 17, name: "RASYA NAUFAL ZAIN MUFID", nis: "2024017", hasPaid: false, lastPayment: "2025-01-08" },
    { id: 18, name: "RESTI APRIANI", nis: "2024018", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 19, name: "SHIFALAH AINUN FAJRI", nis: "2024019", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 20, name: "TALITA APRILIA", nis: "2024020", hasPaid: false, lastPayment: "2025-01-08" },
    { id: 21, name: "VEGA ROLISTA SAHRA", nis: "2024021", hasPaid: true, lastPayment: "2025-01-15" },
    { id: 22, name: "WAFA AULIA MASWA", nis: "2024022", hasPaid: true, lastPayment: "2025-01-15" },
  ])

  const [newExpense, setNewExpense] = useState({ description: "", amount: "" })
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showStudentList, setShowStudentList] = useState(false)
  const [showReports, setShowReports] = useState(false)
  const [classSettings, setClassSettings] = useState({
    studentCount: classData.studentCount,
    weeklyFee: classData.weeklyFeePerStudent,
    initialFund: classData.totalFund,
  })

  const paidStudents = students.filter((s) => s.hasPaid).length
  const unpaidStudents = students.filter((s) => !s.hasPaid).length

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) return

    const expense: Expense = {
      id: Date.now(),
      description: newExpense.description,
      amount: Number.parseInt(newExpense.amount),
      date: new Date().toISOString().split("T")[0],
    }

    setExpenses([expense, ...expenses])
    setNewExpense({ description: "", amount: "" })
    setShowExpenseForm(false)
  }

  const handleEditExpense = () => {
    if (!editingExpense || !editingExpense.description || !editingExpense.amount) return

    setExpenses(expenses.map((exp) => (exp.id === editingExpense.id ? editingExpense : exp)))
    setEditingExpense(null)
  }

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id))
  }

  const toggleStudentPayment = (studentId: number) => {
    if (user?.role !== "bendahara") return

    setStudents(
      students.map((student) =>
        student.id === studentId
          ? {
              ...student,
              hasPaid: !student.hasPaid,
              lastPayment: !student.hasPaid ? new Date().toISOString().split("T")[0] : student.lastPayment,
            }
          : student,
      ),
    )
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const remainingFund = classSettings.initialFund - totalExpenses

  const generateReport = () => {
    const reportData = {
      className: "XI TJKT 1",
      totalStudents: students.length,
      paidStudents,
      unpaidStudents,
      paymentRate: ((paidStudents / students.length) * 100).toFixed(1),
      totalFund: classSettings.initialFund,
      totalExpenses,
      remainingFund,
      weeklyCollection: classSettings.studentCount * classSettings.weeklyFee,
      lastUpdated: new Date().toLocaleDateString("id-ID"),
      unpaidStudentsList: students.filter((s) => !s.hasPaid).map((s) => s.name),
      recentExpenses: expenses.slice(0, 5),
    }
    return reportData
  }

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-all duration-500 ${
        theme === "blue"
          ? "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
          : "bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <Button
              variant="outline"
              onClick={onBack}
              className="border-slate-300 dark:border-slate-600 bg-transparent flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white truncate">
                {classData.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">Detail Kas Kelas</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 flex-shrink-0">
            {/* Settings - Only for Bendahara */}
            {user?.role === "bendahara" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-slate-300 dark:border-slate-600 bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Pengaturan</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Pengaturan Kelas</DialogTitle>
                    <DialogDescription>
                      Atur konfigurasi dasar untuk kelas XI TJKT 1 termasuk jumlah siswa, kas mingguan, dan dana awal.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="studentCount">Jumlah Siswa</Label>
                      <Input
                        id="studentCount"
                        type="number"
                        value={classSettings.studentCount}
                        onChange={(e) =>
                          setClassSettings({
                            ...classSettings,
                            studentCount: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="weeklyFee">Kas per Siswa per Minggu</Label>
                      <Input
                        id="weeklyFee"
                        type="number"
                        value={classSettings.weeklyFee}
                        onChange={(e) =>
                          setClassSettings({
                            ...classSettings,
                            weeklyFee: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="initialFund">Dana Awal</Label>
                      <Input
                        id="initialFund"
                        type="number"
                        value={classSettings.initialFund}
                        onChange={(e) =>
                          setClassSettings({
                            ...classSettings,
                            initialFund: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* Reports - Available for both Bendahara and Guru */}
            <Button
              onClick={() => setShowReports(true)}
              className={`${theme === "blue" ? "bg-purple-600 hover:bg-purple-700" : "bg-indigo-600 hover:bg-indigo-700"} text-white`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Laporan</span>
            </Button>

            {/* Student List - Available for both */}
            <Button
              onClick={() => setShowStudentList(true)}
              className={`${theme === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700"} text-white`}
            >
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Daftar Siswa</span>
            </Button>

            {/* Add Expense - Only for Bendahara */}
            {user?.role === "bendahara" && (
              <Button
                onClick={() => setShowExpenseForm(true)}
                className={`${theme === "blue" ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"} text-white`}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Tambah Pengeluaran</span>
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Jumlah Siswa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                {classSettings.studentCount}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Siswa aktif</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Kas Mingguan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                Rp {(classSettings.studentCount * classSettings.weeklyFee).toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Rp {classSettings.weeklyFee.toLocaleString("id-ID")}/siswa
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Total Kas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                Rp {classSettings.initialFund.toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Dana terkumpul</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                Sisa Kas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                Rp {remainingFund.toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tersedia</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Sudah Bayar Kas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{paidStudents}</div>
              <p className="text-slate-600 dark:text-slate-300">dari {students.length} siswa</p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(paidStudents / students.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-white flex items-center">
                <XCircle className="w-5 h-5 mr-2 text-red-500" />
                Belum Bayar Kas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">{unpaidStudents}</div>
              <p className="text-slate-600 dark:text-slate-300">siswa belum bayar</p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(unpaidStudents / students.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expenses */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white">Riwayat Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-8">Belum ada pengeluaran</p>
            ) : (
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 dark:text-white truncate">{expense.description}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(expense.date).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      <p className="font-semibold text-red-600 dark:text-red-400 text-sm sm:text-base">
                        -Rp {expense.amount.toLocaleString("id-ID")}
                      </p>
                      {user?.role === "bendahara" && (
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingExpense(expense)}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 p-1"
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Expense Modal - Only for Bendahara */}
      {user?.role === "bendahara" && (
        <Dialog open={showExpenseForm} onOpenChange={setShowExpenseForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Pengeluaran</DialogTitle>
              <DialogDescription>Masukkan detail pengeluaran kelas yang akan dicatat dalam sistem</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Masukkan deskripsi pengeluaran..."
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="amount">Jumlah (Rp)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>
              <Button onClick={handleAddExpense} className="w-full">
                Tambah Pengeluaran
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Expense Modal - Only for Bendahara */}
      {user?.role === "bendahara" && (
        <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Pengeluaran</DialogTitle>
              <DialogDescription>Ubah detail pengeluaran yang sudah tercatat</DialogDescription>
            </DialogHeader>
            {editingExpense && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-description">Deskripsi</Label>
                  <Textarea
                    id="edit-description"
                    value={editingExpense.description}
                    onChange={(e) => setEditingExpense({ ...editingExpense, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-amount">Jumlah (Rp)</Label>
                  <Input
                    id="edit-amount"
                    type="number"
                    value={editingExpense.amount}
                    onChange={(e) =>
                      setEditingExpense({ ...editingExpense, amount: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <Button onClick={handleEditExpense} className="w-full">
                  Simpan Perubahan
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Student List Modal - Available for both */}
      <Dialog open={showStudentList} onOpenChange={setShowStudentList}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Daftar Siswa XI TJKT 1</DialogTitle>
            <DialogDescription>Daftar lengkap siswa dengan status pembayaran kas mingguan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Total: {students.length} siswa | Sudah bayar: {paidStudents} | Belum bayar: {unpaidStudents}
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>NIS</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Terakhir Bayar</TableHead>
                    {user?.role === "bendahara" && <TableHead>Aksi</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.nis}</TableCell>
                      <TableCell>
                        <Badge variant={student.hasPaid ? "default" : "destructive"}>
                          {student.hasPaid ? "Sudah Bayar" : "Belum Bayar"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(student.lastPayment).toLocaleDateString("id-ID")}</TableCell>
                      {user?.role === "bendahara" && (
                        <TableCell>
                          <Button
                            size="sm"
                            variant={student.hasPaid ? "destructive" : "default"}
                            onClick={() => toggleStudentPayment(student.id)}
                            className="text-xs"
                          >
                            {student.hasPaid ? "Tandai Belum Bayar" : "Tandai Sudah Bayar"}
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reports Modal - Available for both */}
      <Dialog open={showReports} onOpenChange={setShowReports}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Laporan Kas Kelas XI TJKT 1</DialogTitle>
            <DialogDescription>Laporan lengkap mengenai kas kelas dan status pembayaran siswa</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Ringkasan</TabsTrigger>
              <TabsTrigger value="students">Siswa</TabsTrigger>
              <TabsTrigger value="expenses">Pengeluaran</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Siswa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{generateReport().totalStudents}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Tingkat Pembayaran</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{generateReport().paymentRate}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Kas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Rp {generateReport().totalFund.toLocaleString("id-ID")}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Sisa Kas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      Rp {generateReport().remainingFund.toLocaleString("id-ID")}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Siswa Belum Bayar</CardTitle>
                </CardHeader>
                <CardContent>
                  {generateReport().unpaidStudentsList.length === 0 ? (
                    <p className="text-green-600">Semua siswa sudah membayar kas!</p>
                  ) : (
                    <ul className="space-y-1">
                      {generateReport().unpaidStudentsList.map((name, index) => (
                        <li key={index} className="text-sm text-red-600">
                          • {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Terakhir Bayar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Badge variant={student.hasPaid ? "default" : "destructive"}>
                            {student.hasPaid ? "Sudah Bayar" : "Belum Bayar"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(student.lastPayment).toLocaleDateString("id-ID")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Total Pengeluaran</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">Rp {totalExpenses.toLocaleString("id-ID")}</div>
                  </CardContent>
                </Card>
                <div className="space-y-2">
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-slate-500">{new Date(expense.date).toLocaleDateString("id-ID")}</p>
                      </div>
                      <p className="font-semibold text-red-600">-Rp {expense.amount.toLocaleString("id-ID")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
