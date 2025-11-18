import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// GET /api/expenses?class=XI TJKT 1
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const className = searchParams.get('class')

    if (!className) {
      return NextResponse.json(
        { success: false, message: 'Class parameter is required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    const { data: expenses, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('class_name', className)
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching expenses:', error)
      return NextResponse.json(
        { success: false, message: 'Error fetching expenses' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      expenses: expenses || [],
    })
  } catch (error) {
    console.error('Error in GET /api/expenses:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/expenses
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { class_name, description, amount, created_by } = body

    if (!class_name || !description || !amount) {
      return NextResponse.json(
        { success: false, message: 'Class name, description, and amount are required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    const { data: expense, error } = await supabase
      .from('expenses')
      .insert({
        class_name,
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0],
        created_by: created_by || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating expense:', error)
      return NextResponse.json(
        { success: false, message: 'Error creating expense' },
        { status: 500 }
      )
    }

    // Update class settings total expenses
    const { data: classSetting } = await supabase
      .from('class_settings')
      .select('total_expenses, current_fund')
      .eq('class_name', class_name)
      .single()

    if (classSetting) {
      await supabase
        .from('class_settings')
        .update({
          total_expenses: parseFloat(classSetting.total_expenses) + parseFloat(amount),
          current_fund: parseFloat(classSetting.current_fund) - parseFloat(amount),
        })
        .eq('class_name', class_name)
    }

    return NextResponse.json({
      success: true,
      expense,
    })
  } catch (error) {
    console.error('Error in POST /api/expenses:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

