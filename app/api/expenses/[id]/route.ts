import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// GET /api/expenses/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()

    const { data: expense, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !expense) {
      return NextResponse.json(
        { success: false, message: 'Expense not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      expense,
    })
  } catch (error) {
    console.error('Error in GET /api/expenses/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/expenses/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    // Get old expense to calculate difference
    const { data: oldExpense } = await supabase
      .from('expenses')
      .select('*')
      .eq('id', params.id)
      .single()

    const updateData: any = {}
    if (body.description !== undefined) updateData.description = body.description
    if (body.amount !== undefined) updateData.amount = parseFloat(body.amount)
    if (body.date !== undefined) updateData.date = body.date

    const { data: expense, error } = await supabase
      .from('expenses')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating expense:', error)
      return NextResponse.json(
        { success: false, message: 'Error updating expense' },
        { status: 500 }
      )
    }

    // Update class settings if amount changed
    if (oldExpense && body.amount !== undefined) {
      const amountDiff = parseFloat(body.amount) - parseFloat(oldExpense.amount)
      const { data: classSetting } = await supabase
        .from('class_settings')
        .select('total_expenses, current_fund')
        .eq('class_name', oldExpense.class_name)
        .single()

      if (classSetting) {
        await supabase
          .from('class_settings')
          .update({
            total_expenses: parseFloat(classSetting.total_expenses) + amountDiff,
            current_fund: parseFloat(classSetting.current_fund) - amountDiff,
          })
          .eq('class_name', oldExpense.class_name)
      }
    }

    return NextResponse.json({
      success: true,
      expense,
    })
  } catch (error) {
    console.error('Error in PUT /api/expenses/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/expenses/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()

    // Get expense to update class settings
    const { data: expense } = await supabase
      .from('expenses')
      .select('*')
      .eq('id', params.id)
      .single()

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting expense:', error)
      return NextResponse.json(
        { success: false, message: 'Error deleting expense' },
        { status: 500 }
      )
    }

    // Update class settings
    if (expense) {
      const { data: classSetting } = await supabase
        .from('class_settings')
        .select('total_expenses, current_fund')
        .eq('class_name', expense.class_name)
        .single()

      if (classSetting) {
        await supabase
          .from('class_settings')
          .update({
            total_expenses: parseFloat(classSetting.total_expenses) - parseFloat(expense.amount),
            current_fund: parseFloat(classSetting.current_fund) + parseFloat(expense.amount),
          })
          .eq('class_name', expense.class_name)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Expense deleted successfully',
    })
  } catch (error) {
    console.error('Error in DELETE /api/expenses/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

