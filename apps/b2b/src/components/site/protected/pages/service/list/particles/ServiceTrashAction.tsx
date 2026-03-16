import { useDeleteServiceMutation } from '@/lib/features/service/servicesApi';
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import { ERROR_MESSAGE } from '@repo/ui/constants/defaultMessage';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const ServiceTrashAction = ({ id }: { id: string }) => {
  const [deleteService, { isLoading }] = useDeleteServiceMutation();
  const handleDelete = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this service? This action cannot be undone.',
    );
    if (!confirm) return;

    await toast.promise(deleteService(id).unwrap(), {
      loading: 'Deleting service...',
      success: 'Service deleted successfully',
      error: (err) => err?.data?.message || ERROR_MESSAGE,
    });
  };

  return (
    <ButtonGroup>
      <Button
        size="icon-sm"
        variant="destructive"
        disabled={isLoading}
        onClick={handleDelete}
      >
        <Trash2 />
      </Button>
    </ButtonGroup>
  );
};

export default ServiceTrashAction;
