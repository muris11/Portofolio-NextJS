export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} Portfolio Admin Panel
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">v1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
