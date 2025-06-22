
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-8">
            <h1 className="text-2xl font-bold mb-6">Panel Admin</h1>
            {children}
        </div>
    )
}
