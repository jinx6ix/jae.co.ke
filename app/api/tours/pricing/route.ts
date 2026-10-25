import { NextRequest, NextResponse } from 'next/server';
import { resolveTourPricing } from '@/lib/seasonal-pricing';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tour = searchParams.get('tour');
    const date = searchParams.get('date');
    const travelers = Number(searchParams.get('travelers') || '2');

    if (!tour) {
      return NextResponse.json(
        { success: false, message: 'Missing tour parameter' },
        { status: 400 }
      );
    }

    const pricing = await resolveTourPricing(tour, date || new Date().toISOString(), travelers);

    return NextResponse.json({
      success: true,
      ...pricing,
    });
  } catch (error: any) {
    console.error('[API /tours/pricing] Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to resolve pricing' },
      { status: 500 }
    );
  }
}
