import EquipmentCreatePage from '@/pages/equipments/EquipmentCreatePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipments/create')({
  component: EquipmentCreatePage,
});
