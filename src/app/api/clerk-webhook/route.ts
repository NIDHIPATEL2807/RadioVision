// src/app/api/clerk-webhook/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/app/superBase'; 

// This function will handle POST requests to /api/clerk-webhook
export async function POST(request: Request) {
  try {
    // Parse the incoming JSON payload from Clerk
    const event = await request.json();

    // Process only user.created or user.updated events
    if (event.type === 'user.created' || event.type === 'user.updated') {
      const user = event.data;
      
      // Extract required fields from the webhook payload
      const id: string = user.id;
      const email: string | undefined = user.email_addresses?.[0]?.email_address;
      const firstName: string | undefined = user.first_name;
      const lastName: string = user.last_name || '';

      // Validate required fields
      if (!id || !email || !firstName) {
        return NextResponse.json(
          { success: false, error: 'Missing required user data (id, email, or firstName)' },
          { status: 400 }
        );
      }

      // Upsert the user data into the Supabase "users" table
      const { error } = await supabase
        .from('users')
        .upsert({ id, email, firstName, lastName }, { onConflict: 'id' });

      if (error) {
        console.error('Supabase upsert error:', error);
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }
    }

    // Respond to acknowledge receipt of the webhook
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { success: false, error: error },
      { status: 500 }
    );
  }
}

    
