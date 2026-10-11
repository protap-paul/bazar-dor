"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { type Category, getBanglaDate } from "@/lib/utils";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import PriceTicker from "./PriceTicker";

const Navbar = () => {
    const { data: session, isPending } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState("");
    useEffect(() => {
        setCurrentDate(getBanglaDate());
    }, []);

    useEffect(() => {
        fetch("https://openapi.programming-hero.com/api/bazardor/categories")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Categories fetch failed");
                }
                return res.json();
            })
            .then((data) => setCategories(data))
            .catch((err) =>
                console.error("Error fetching categories:", err)
            );
    }, []);

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সাইন আউট সফল হয়েছে!");
                    router.push("/");
                },
            },
        });
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            {/* Top Row: Logo + Auth */}
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo-icon.png"
                        alt="Logo"
                        width={36}
                        height={36}
                        className="w-9 h-9 bg-green-600 rounded-lg"
                    />

                    <div>
                        <h1 className="font-bold text-gray-900 text-base leading-none">
                            বাজার দর
                        </h1>

                        {/* Fixed: render state instead of calling getBanglaDate() */}
                        <p className="text-xs text-gray-500 leading-none mt-0.5">
                            {currentDate}
                        </p>
                    </div>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    aria-label="Toggle mobile menu"
                    aria-expanded={mobileMenuOpen}
                    className="lg:hidden btn btn-ghost btn-sm"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                                mobileMenuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                            }
                        />
                    </svg>
                </button>

                {/* Auth Buttons (Desktop) */}
                <div className="hidden lg:flex items-center gap-2">
                    {isPending ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : session ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-sm gap-2"
                            >
                                <div className="avatar placeholder">
                                    <div className="bg-green-100 text-green-700 rounded-full w-8">
                                        <span className="text-sm">
                                            {session.user.name?.charAt(0) || "U"}
                                        </span>
                                    </div>
                                </div>

                                <span>{session.user.name}</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-white rounded-box shadow-lg z-1 w-52 p-2"
                            >
                                <li>
                                    <Link href="/profile">
                                        <CgProfile />
                                        আমার প্রোফাইল
                                    </Link>
                                </li>

                                <li>
                                    <button onClick={handleSignOut}>
                                        <GoSignOut />
                                        সাইন আউট
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/sign-in"
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1.5"
                            >
                                সাইন ইন
                            </Link>

                            <Link
                                href="/sign-up"
                                className="text-sm font-semibold bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition"
                            >
                                সাইন আপ
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Category Links */}
            <div className="border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className={`${mobileMenuOpen ? "block" : "hidden"} lg:block`}>
                        <ul className="flex flex-wrap items-center gap-1 py-2">
                            {categories.map((cat) => {
                                const isActive =
                                    pathname === `/category/${cat.slug}`;

                                return (
                                    <li key={cat.slug}>
                                        <Link
                                            href={`/category/${cat.slug}`}
                                            className={`btn btn-sm ${isActive
                                                ? "btn-success text-white"
                                                : "btn-ghost text-gray-600 hover:bg-green-50"
                                                }`}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            <span>{cat.icon}</span>
                                            {cat.nameBn}
                                        </Link>
                                    </li>
                                );
                            })}

                            {/* Mobile Auth Buttons */}
                            {mobileMenuOpen && (
                                <li className="w-full mt-2 flex gap-2 lg:hidden">
                                    {session ? (
                                        <>
                                            <Link
                                                href="/profile"
                                                className="btn btn-sm btn-outline btn-success flex-1"
                                            >
                                                প্রোফাইল
                                            </Link>

                                            <button
                                                onClick={handleSignOut}
                                                className="btn btn-sm btn-error text-white flex-1"
                                            >
                                                সাইন আউট
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/sign-in"
                                                className="btn btn-sm btn-outline btn-success flex-1"
                                            >
                                                সাইন ইন
                                            </Link>

                                            <Link
                                                href="/sign-up"
                                                className="btn btn-sm btn-success text-white flex-1"
                                            >
                                                সাইন আপ
                                            </Link>
                                        </>
                                    )}
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Price Ticker */}
            <PriceTicker />
        </header>
    );
};

export default Navbar;
