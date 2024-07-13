import { dataProvider } from '@/api';
import { IEquipmentResDto } from '@/libs';
import EquipmentUpdatePage from '@/pages/equipments/EquipmentUpdatePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/equipments/$id/update')({
  component: EquipmentUpdatePage,
  loader: ({ params: { id } }) =>
    dataProvider.getOne<IEquipmentResDto>({ id, resource: 'equipments' }),
});
