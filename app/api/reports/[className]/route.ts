import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// GET /api/reports/[className]
export async function GET(
  request: NextRequest,
  { params }: { params: { className: string } }
) {
  try {
    const supabase = createServerClient()
    const className = decodeURIComponent(params.className)

    // Get students
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('*')
      .eq('class', className)

    if (studentsError) {
      console.error('Error fetching students:', studentsError)
    }

    // Get expenses
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select('*')
      .eq('class_name', className)

    if (expensesError) {
      console.error('Error fetching expenses:', expensesError)
    }

    // Get class settings
    const { data: classSetting, error: classError } = await supabase
      .from('class_settings')
      .select('*')
      .eq('class_name', className)
      .single()

    if (classError) {
      console.error('Error fetching class settings:', classError)
    }

    // Calculate statistics
    const totalStudents = students?.length || 0
    const paidStudents = students?.filter((s) => s.has_paid).length || 0
    const unpaidStudents = totalStudents - paidStudents
    const totalExpenses = expenses?.reduce((sum, e) => sum + parseFloat(e.amount), 0) || 0
    const totalFund = classSetting?.initial_fund || 0
    const remainingFund = classSetting?.current_fund || 0
    const weeklyCollection = classSetting?.total_weekly_fee || 0
    const paymentRate = totalStudents > 0 ? (paidStudents / totalStudents) * 100 : 0

    const report = {
      class_name: className,
      total_students: totalStudents,
      paid_students: paidStudents,
      unpaid_students: unpaidStudents,
      total_fund: totalFund,
      total_expenses: totalExpenses,
      remaining_fund: remainingFund,
      weekly_collection: weeklyCollection,
      payment_rate: parseFloat(paymentRate.toFixed(2)),
      last_updated: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      report,
    })
  } catch (error) {
    console.error('Error in GET /api/reports/[className]:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

