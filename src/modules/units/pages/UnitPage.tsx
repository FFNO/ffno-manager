import { useOne } from "@/api";
import { UnitResDto } from "@/libs";
import { Route } from "@/routes/units/$unitId.lazy";
import { Code } from "@mantine/core";

export const UnitPage = () => {
  const { unitId } = Route.useParams();

  const { data: unitInfo } = useOne<UnitResDto>({
    resource: "units",
    id: unitId,
  });

  return (
    <div>
      <Code block>{JSON.stringify(unitInfo, null, 2)}</Code>
    </div>
  );
};
