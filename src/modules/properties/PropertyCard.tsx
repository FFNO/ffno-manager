import { PropertyResDto } from "@/contracts";
import { Card, Divider, Image } from "@mantine/core";
import { Link } from "@tanstack/react-router";

interface Props extends PropertyResDto {}

export const PropertyCard = (props: Props) => {
  const { id } = props;
  return (
    <Card
      component={Link}
      to={`/properties/${id}`}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={200}
          alt="Norway"
        />
      </Card.Section>
      <Divider />
      {JSON.stringify(props)}
    </Card>
  );
};
