import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// GET /api/students/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()

    const { data: student, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !student) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      student,
    })
  } catch (error) {
    console.error('Error in GET /api/students/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/students/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    const updateData: any = {}
    if (body.name !== undefined) updateData.name = body.name
    if (body.nis !== undefined) updateData.nis = body.nis
    if (body.class !== undefined) updateData.class = body.class
    if (body.has_paid !== undefined) {
      updateData.has_paid = body.has_paid
      if (body.has_paid) {
        updateData.last_payment = new Date().toISOString().split('T')[0]
      }
    }

    const { data: student, error } = await supabase
      .from('students')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating student:', error)
      return NextResponse.json(
        { success: false, message: 'Error updating student' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      student,
    })
  } catch (error) {
    console.error('Error in PUT /api/students/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/students/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting student:', error)
      return NextResponse.json(
        { success: false, message: 'Error deleting student' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully',
    })
  } catch (error) {
    console.error('Error in DELETE /api/students/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

