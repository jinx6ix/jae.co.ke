import Link from 'next/link';

export const AccessibleNav = () => {
    const links = [
        { name: 'Research Home', href: '/accessible-tourism-research' },
        { name: 'Safari Index', href: '/accessible-safari-index' },
        { name: 'Methodology', href: '/accessible-safari-methodology' },
        { name: '2026 Report', href: '/accessible-safari-report-2026' },
        { name: 'Accessible Safaris', href: '/accessible-safaris' },
    ];

    return (
        <nav className="bg-gray-100 p-4 mb-6 rounded">
            <ul className="flex flex-wrap gap-4">
                {links.map((link) => (
                    <li key={link.name}>
                        <Link href={link.href} className="text-blue-600 hover:underline">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
