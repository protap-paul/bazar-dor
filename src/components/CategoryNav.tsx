
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/utils";

type CategoryNavProps = {
    categories: Category[];
    mobileMenuOpen: boolean;
    onNavigate: () => void;
};

export default function CategoryNav({
    categories,
    mobileMenuOpen,
    onNavigate,
}: CategoryNavProps) {
    const pathname = usePathname();

    return (
        <nav className={`${mobileMenuOpen ? "block" : "hidden"} lg:block`}>
            <ul className="flex flex-wrap items-center gap-1 py-2">
                {categories.map((cat) => {
                    const isActive = pathname === `/category/${cat.slug}`;

                    return (
                        <li key={cat.slug}>
                            <Link
                                href={`/category/${cat.slug}`}
                                onClick={onNavigate}
                                className={`btn btn-sm ${isActive
                                        ? "btn-success text-white"
                                        : "btn-ghost text-gray-600 hover:bg-green-50"
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                {cat.nameBn}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
