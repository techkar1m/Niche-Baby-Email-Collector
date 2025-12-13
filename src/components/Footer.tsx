export default function Footer() {
  return (
    <footer className="w-full py-8 px-8 mt-auto">
      <div className="max-w-[100rem] mx-auto text-center">
        <p className="text-sm font-paragraph text-foreground opacity-70">
          © {new Date().getFullYear()} Niche Baby. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
