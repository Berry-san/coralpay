import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const InviteUserModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-white">
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input placeholder="Email Address" type="email" />

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Assign Role" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="admin2">Admin 2</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            className="bg-purple-100 text-purple-900"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="bg-purple-800 text-white hover:bg-purple-900">
            Invite User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
