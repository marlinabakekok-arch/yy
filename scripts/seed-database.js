// Database seeding script for SMK YPE SAMPANG class fund management
// This script seeds the Supabase database with initial data
// Run: node scripts/seed-database.js

import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const students = [
  { name: "AFRIDA DWI MUSRATUN", nis: "2024001", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "ALFA IZAH DENOK TRIANINGRUM", nis: "2024002", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "ALISYA RIZKI SAFITRI", nis: "2024003", class: "XI TJKT 1", has_paid: false, last_payment: "2025-01-08" },
  { name: "ARYA GUSTI PURNIAWAN", nis: "2024004", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "AUFA MAULIND JUNIVER", nis: "2024005", class: "XI TJKT 1", has_paid: false, last_payment: "2025-01-08" },
  { name: "AZKA DINI SALWANA", nis: "2024006", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "AZZAHRA AURORA PARAMADHITA", nis: "2024007", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "CAHYANI UNTARI", nis: "2024008", class: "XI TJKT 1", has_paid: false, last_payment: "2025-01-08" },
  { name: "DIAN FITRIANINGSIH", nis: "2024009", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "ELMA AMELIA", nis: "2024010", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "GILANG PRASETO", nis: "2024011", class: "XI TJKT 1", has_paid: false, last_payment: "2025-01-08" },
  { name: "IBNU VINSA MAULANA", nis: "2024012", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "INAN DIYATUL KHAWA", nis: "2024013", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "MUHAMAD AZRIL ADZANI", nis: "2024014", class: "XI TJKT 1", has_paid: false, last_payment: "2025-01-08" },
  { name: "NABILA EUFIRA RIANTI", nis: "2024015", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "NUR AULI DERMAWAN", nis: "2024016", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "RASYA NAUFAL ZAIN MUFID", nis: "2024017", class: "XI TJKT 1", has_paid: false, last_payment: "2025-01-08" },
  { name: "RESTI APRIANI", nis: "2024018", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "SHIFAIAH AINUN FAJRI", nis: "2024019", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "TALITA APRILIA", nis: "2024020", class: "XI TJKT 1", has_paid: false, last_payment: "2025-01-08" },
  { name: "VEGA ROLISTA SAHRA", nis: "2024021", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
  { name: "WAFA AULIA MASWA", nis: "2024022", class: "XI TJKT 1", has_paid: true, last_payment: "2025-01-15" },
]

const expenses = [
  { class_name: "XI TJKT 1", description: "Fotokopi Materi", amount: 50000, date: "2025-01-15" },
  { class_name: "XI TJKT 1", description: "Kertas HVS", amount: 75000, date: "2025-01-10" },
  { class_name: "XI TJKT 1", description: "Spidol Whiteboard", amount: 25000, date: "2025-01-08" },
  { class_name: "XI TJKT 1", description: "Pembersih Kelas", amount: 40000, date: "2025-01-05" },
]

const classSettings = {
  class_name: "XI TJKT 1",
  student_count: 22,
  weekly_fee_per_student: 5000,
  total_weekly_fee: 110000,
  initial_fund: 1540000,
  current_fund: 1200000,
  total_expenses: 340000,
}

// Function to seed the database
async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Hash passwords for users
    const aufaPasswordHash = await bcrypt.hash("aufa123", 10)
    const azkiaPasswordHash = await bcrypt.hash("azkia123", 10)
    const dianaPasswordHash = await bcrypt.hash("guru2025", 10)

    const users = [
      {
        username: "Aufa",
        name: "Aufa",
        email: "aufa@smkypesampang.sch.id",
        password_hash: aufaPasswordHash,
        role: "bendahara",
        assigned_class: "XI TJKT 1",
      },
      {
        username: "Azkia",
        name: "Azkia",
        email: "azkia@smkypesampang.sch.id",
        password_hash: azkiaPasswordHash,
        role: "bendahara",
        assigned_class: "XI TJKT 1",
      },
      {
        username: "BuDiana",
        name: "Bu Diana",
        email: "diana@smkypesampang.sch.id",
        password_hash: dianaPasswordHash,
        role: "guru",
        assigned_class: "XI TJKT 1",
      },
    ]

    // Insert users
    console.log("Inserting users...")
    const { data: insertedUsers, error: usersError } = await supabase
      .from('users')
      .upsert(users, { onConflict: 'email' })
      .select()

    if (usersError) {
      console.error("Error inserting users:", usersError)
    } else {
      console.log(`✓ ${insertedUsers?.length || 0} users inserted`)
    }

    // Insert students
    console.log("Inserting students...")
    const { data: insertedStudents, error: studentsError } = await supabase
      .from('students')
      .upsert(students, { onConflict: 'nis' })
      .select()

    if (studentsError) {
      console.error("Error inserting students:", studentsError)
    } else {
      console.log(`✓ ${insertedStudents?.length || 0} students inserted`)
    }

    // Insert expenses
    console.log("Inserting expenses...")
    const { data: insertedExpenses, error: expensesError } = await supabase
      .from('expenses')
      .insert(expenses)
      .select()

    if (expensesError) {
      console.error("Error inserting expenses:", expensesError)
    } else {
      console.log(`✓ ${insertedExpenses?.length || 0} expenses inserted`)
    }

    // Insert/update class settings
    console.log("Inserting class settings...")
    const { data: insertedSettings, error: settingsError } = await supabase
      .from('class_settings')
      .upsert(classSettings, { onConflict: 'class_name' })
      .select()

    if (settingsError) {
      console.error("Error inserting class settings:", settingsError)
    } else {
      console.log(`✓ Class settings configured for ${classSettings.class_name}`)
    }

    console.log("\nDatabase seeded successfully!")
    console.log(`- ${insertedUsers?.length || 0} users added`)
    console.log(`- ${insertedStudents?.length || 0} students added`)
    console.log(`- ${insertedExpenses?.length || 0} expenses added`)
    console.log(`- Class settings configured for ${classSettings.class_name}`)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('seed-database.js')) {
  seedDatabase()
}

export { students, expenses, users, classSettings, seedDatabase }
