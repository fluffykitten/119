import type { StudentElement } from '../types/element';

/**
 * Cloudflare Pages API Client for the Shared Online Classroom Wall.
 * Gracefully falls back to local storage if API is unreachable.
 */

export async function fetchRoomRoster(roomCode: string): Promise<StudentElement[] | null> {
  const cleanCode = roomCode.trim().toUpperCase();
  if (!cleanCode) return null;

  try {
    const res = await fetch(`/api/wall?room=${encodeURIComponent(cleanCode)}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data as StudentElement[];
      }
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch online classroom roster:', err);
    return null;
  }
}

export async function saveElementToRoom(roomCode: string, element: StudentElement): Promise<boolean> {
  const cleanCode = roomCode.trim().toUpperCase();
  if (!cleanCode || !element?.id) return false;

  try {
    const res = await fetch('/api/wall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room: cleanCode,
        element,
      }),
    });

    return res.ok;
  } catch (err) {
    console.warn('Could not sync card to online classroom wall:', err);
    return false;
  }
}

export async function deleteElementFromRoom(roomCode: string, elementId: string): Promise<boolean> {
  const cleanCode = roomCode.trim().toUpperCase();
  if (!cleanCode || !elementId) return false;

  try {
    const res = await fetch('/api/wall', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room: cleanCode,
        elementId,
      }),
    });

    return res.ok;
  } catch (err) {
    console.warn('Could not delete card from online classroom wall:', err);
    return false;
  }
}
