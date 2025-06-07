
// src/app/api/create-session/route.ts
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    // No futuro, você pode querer validar o stationId ou checklistId aqui,
    // e talvez armazenar a sessão no Firestore.
    // const { stationId, checklistId } = await request.json();

    const sessionId = uuidv4();
    console.log(`[API /create-session] Nova sessão criada: ${sessionId}`);

    return NextResponse.json({ sessionId }, { status: 200 });
  } catch (error) {
    console.error('[API /create-session] Erro ao criar sessão:', error);
    return NextResponse.json({ message: 'Erro ao criar sessão', error: (error as Error).message }, { status: 500 });
  }
}
