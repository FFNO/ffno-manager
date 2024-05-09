import { useOne } from '@/api';
import { UnitResDto } from '@/shared';
import { Code } from '@mantine/core';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/managers/units/$unitId')({
  component: UnitPage,
});

function UnitPage() {
  const { unitId } = Route.useParams();

  const { data: unitInfo } = useOne<UnitResDto>({
    resource: 'units',
    id: unitId,
  });

  return (
    <div>
      <Code block>{JSON.stringify(unitInfo, null, 2)}</Code>
    </div>
  );
}
