import Link from "next/link";
export default function Dashboard(){return <main className="space-y-4"><h1 className="text-3xl font-bold">Dashboard</h1><p>Your active plan and next workout are available after onboarding in demo mode.</p><div className="flex gap-3"><Link href="/plan" className="underline">View full plan</Link><Link href="/coach" className="underline">Coach chat</Link></div></main>}
