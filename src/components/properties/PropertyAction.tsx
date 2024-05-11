import { Button, Menu } from '@mantine/core';
import { useNavigate, useParams } from '@tanstack/react-router';
import {
  MoreHorizontalCircle01Icon,
  PencilEdit02Icon,
  PlusSignIcon,
} from 'hugeicons-react';

export function PropertyAction() {
  const { id } = useParams({ from: '/properties/$id/' });
  const navigate = useNavigate({ from: '/properties/$id' });

  const handleUpdate = () =>
    navigate({
      to: '/properties/$id/update',
      params: { id },
    });

  const handleAddUnit = () =>
    navigate({
      to: '/properties/$id/add-unit',
      params: { id },
    });

  return (
    <Menu>
      <Menu.Target>
        <Button variant="light" rightSection={<MoreHorizontalCircle01Icon />}>
          Actions
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<PlusSignIcon size={16} />}
          onClick={() => handleAddUnit()}
        >
          Add unit
        </Menu.Item>
        <Menu.Item
          leftSection={<PencilEdit02Icon size={16} />}
          onClick={() => handleUpdate()}
        >
          Edit property
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
