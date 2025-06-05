
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/dashboard');
  // The redirect function throws a NEXT_REDIRECT error, so execution stops here.
  // No need to return any JSX.
}
