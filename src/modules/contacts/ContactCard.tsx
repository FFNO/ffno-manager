import { GetMemberResDto } from "@/contracts";
import { Card } from "@mantine/core";
import { Link } from "@tanstack/react-router";

interface Props extends GetMemberResDto {}

export const ContactCard = (props: Props) => {
  return (
    <div>
      <Link to={"/contacts/$contactId"} params={{ contactId: props.id }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          {JSON.stringify(props)}
        </Card>
      </Link>
    </div>
  );
};
