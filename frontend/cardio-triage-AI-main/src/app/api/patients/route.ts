
import { NextResponse } from 'next/server';
import { MOCK_PATIENTS } from '@/lib/mock-data';

export async function GET() {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return the mock patients data
    return NextResponse.json(MOCK_PATIENTS);
}
