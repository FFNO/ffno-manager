import { dataProvider } from '@/api';
import { IEquipmentResDto } from '@/libs';
import EquipmentDetailPage from '@/pages/equipments/EquipmentDetailPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipments/$id/')({
  component: EquipmentDetailPage,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IEquipmentResDto>({ id, resource: 'equipments' }),
});
