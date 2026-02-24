/**
 * Contact API Route
 *
 * Handles contact form submissions.
 * In production, this would send emails or save to a database.
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ContactFormData, ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Send an email using a service like SendGrid, Resend, or AWS SES
    // 2. Save to a database
    // 3. Send a notification

    // For now, we'll just log the submission
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { message: 'Message sent successfully' },
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
