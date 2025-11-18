import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// PUT /api/students/[id]/payment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { has_paid } = body

    if (typeof has_paid !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'has_paid must be a boolean' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    const updateData: any = {
      has_paid,
    }

    if (has_paid) {
      updateData.last_payment = new Date().toISOString().split('T')[0]
    } else {
      updateData.last_payment = null
    }

    const { data: student, error } = await supabase
      .from('students')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating payment status:', error)
      return NextResponse.json(
        { success: false, message: 'Error updating payment status' },
        { status: 500 }
      )
    }

    // If payment was made, record it in payment history
    if (has_paid) {
      await supabase.from('payment_history').insert({
        student_id: params.id,
        amount: 5000, // Default weekly fee, can be made configurable
        payment_date: new Date().toISOString().split('T')[0],
      })
    }

    return NextResponse.json({
      success: true,
      student,
    })
  } catch (error) {
    console.error('Error in PUT /api/students/[id]/payment:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

