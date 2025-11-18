import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// GET /api/students?class=XI TJKT 1
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

    const { data: students, error } = await supabase
      .from('students')
      .select('*')
      .eq('class', className)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching students:', error)
      return NextResponse.json(
        { success: false, message: 'Error fetching students' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      students: students || [],
    })
  } catch (error) {
    console.error('Error in GET /api/students:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/students
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, nis, class: className } = body

    if (!name || !nis || !className) {
      return NextResponse.json(
        { success: false, message: 'Name, NIS, and class are required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    const { data: student, error } = await supabase
      .from('students')
      .insert({
        name,
        nis,
        class: className,
        has_paid: false,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating student:', error)
      return NextResponse.json(
        { success: false, message: 'Error creating student' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      student,
    })
  } catch (error) {
    console.error('Error in POST /api/students:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

