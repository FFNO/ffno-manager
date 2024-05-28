import EquipmentListPage from '@/pages/equipments/EquipmentListPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipments/')({
  component: EquipmentListPage,
});
