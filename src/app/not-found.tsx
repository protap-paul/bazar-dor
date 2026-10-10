import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <p className="text-8xl mb-4">🔍</p>
                <h1 className="text-6xl font-extrabold text-gray-900 mb-2">৪০৪</h1>
                <h2 className="text-xl font-bold text-gray-700 mb-3">পেজটি পাওয়া যায়নি</h2>
                <p className="text-gray-500 mb-8">
                    আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, নাম পরিবর্তন হয়েছে অথবা কখনোই ছিল না।
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition"
                >
                    <Home size={18} /> হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}
