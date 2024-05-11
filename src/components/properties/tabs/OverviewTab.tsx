import { IPropertyResDto } from '@/libs';
import {
  Chip,
  Fieldset,
  Grid,
  Group,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Home01Icon, Settings05Icon } from 'hugeicons-react';

export function OverviewTab(data: IPropertyResDto) {
  return (
    <Stack py={'lg'}>
      <Fieldset
        legend={
          <Group gap={'xs'} px={'sm'}>
            <Home01Icon size={20} />
            <Title order={4}>Basic information</Title>
          </Group>
        }
      >
        <Stack>
          <SimpleGrid cols={2}>
            <Input.Wrapper label="Property name">
              <Text>{data.name}</Text>
            </Input.Wrapper>
            <Input.Wrapper label="Owner">
              <Text>
                {data.owner.name} - {data.owner.phone}
              </Text>
            </Input.Wrapper>
          </SimpleGrid>
          <Grid columns={12}>
            <Grid.Col span={6}>
              <Input.Wrapper label="Address">
                <Text>{data.address}</Text>
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={2}>
              <Input.Wrapper label="Province">
                <Text>{data.province}</Text>
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={2}>
              <Input.Wrapper label="District">
                <Text>{data.district}</Text>
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={2}>
              <Input.Wrapper label="Ward">
                <Text>{data.ward}</Text>
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={12}>
              <Input.Wrapper label="Description">
                <Text>{data.details}</Text>
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Fieldset>
      <Fieldset
        legend={
          <Group gap={'xs'} px={'sm'}>
            <Settings05Icon size={20} />
            <Title order={4}>Amenities</Title>
          </Group>
        }
      >
        <Group wrap="wrap">
          {data.amenities.map((item) => (
            <Chip checked key={item}>
              {item}
            </Chip>
          ))}
        </Group>
      </Fieldset>
    </Stack>
  );
}
