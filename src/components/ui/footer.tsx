export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 mb-8">
      <p className="text-gray-400 text-sm flex items-center">
        &copy; {new Date().getFullYear()} Max Fu. All rights reserved.
      </p>
      <p className="text-gray-400 text-xs flex items-center gap-1">
        Made with<span className="text-red-500">♥</span>by Max Fu
      </p>
    </footer>
  )
}