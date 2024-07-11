import Link from "next/link";

export default function Home() {
    return <main className="flex min-h-screen flex-col items-center justify-between p-24 container">
        <Link href={'/soc'} className="text-blue-400">SOC Simulator</Link>
    </main>
}
