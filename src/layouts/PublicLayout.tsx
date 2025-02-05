import { PublicNavbar } from '../components/PublicNavbar';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <PublicNavbar />
      <main>{children}</main>
    </div>
  );
}; 