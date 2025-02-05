interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: TableProps) {
  return <thead className="bg-gray-50">{children}</thead>;
}

export function TableBody({ children }: TableProps) {
  return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>;
}

export function TableRow({ children }: TableProps) {
  return <tr>{children}</tr>;
}

export function TableHeader({ children }: TableProps) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableCell({ children }: TableProps) {
  return <td className="px-6 py-4 whitespace-nowrap">{children}</td>;
} 