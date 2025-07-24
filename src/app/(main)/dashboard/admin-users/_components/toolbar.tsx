import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export function Toolbar({ onAdd }) {
  return (
    <div className="flex justify-between items-center py-4">
      <h2 className="text-lg font-semibold">Admin Users</h2>
      <div className="flex gap-2">
        <Button variant="outline">Export</Button>
        <Button onClick={onAdd}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Admin
        </Button>
      </div>
    </div>
  );
}