export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-4 border-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center font-bold">
          <p className="text-sm text-black uppercase tracking-wide">
            © {currentYear} Rifqy.Dev Admin Panel
          </p>
          <p className="text-sm text-black border-2 border-black px-2 py-1 bg-neo-secondary shadow-neo-sm">
            v1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}
