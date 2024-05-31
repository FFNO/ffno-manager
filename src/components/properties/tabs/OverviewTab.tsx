import { DATE_FORMAT, IPropertyResDto } from '@/libs';
import {
  Avatar,
  Card,
  Chip,
  Fieldset,
  Grid,
  Group,
  Input,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import dayjs from 'dayjs';
import {
  Home01Icon,
  PenTool02Icon,
  Settings05Icon,
  StarIcon,
} from 'hugeicons-react';

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
                <Text>{data.description}</Text>
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

      {/* Comments */}
      <Fieldset
        legend={
          <Group gap={'xs'} px={'sm'}>
            <PenTool02Icon size={20} />
            <Title order={4}>Comments</Title>
          </Group>
        }
      >
        <div className="inline-flex gap-4 w-full">
          <Card withBorder p={'lg'}>
            <div className="inline-flex items-center gap-2">
              <StarIcon color="yellow" fill="yellow" />
              <p>{`${data.rating.rating}/5 (Based on ${data.reviews.length} reviews)`}</p>
            </div>
            <Card.Section p={'lg'}>
              <Stack w={400} gap={'xs'}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Stack key={i}>
                    <Group justify="space-between">
                      <p>{i} stars</p>
                      <p>{data.rating.ratingMap[i]}%</p>
                    </Group>
                    <Progress value={data.rating.ratingMap[i]} />
                  </Stack>
                ))}
              </Stack>
            </Card.Section>
          </Card>
          <div className="flex-1 flex flex-col gap-2 border rounded-md p-4">
            {data.reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-2 pb-2 border-b"
              >
                <div className="inline-flex justify-between items-center">
                  {/* Author */}
                  <div className="inline-flex items-center gap-2">
                    <Avatar src={review.author.imgUrl} />
                    <div className="flex flex-col">
                      <p className="font-semibold">{review.author.name}</p>
                      <p className="text-xs">
                        {dayjs(review.createdAt).format(DATE_FORMAT)}
                      </p>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="inline-flex">
                    {Array.from({ length: Math.round(review.rating) }).map(
                      (_, index) => (
                        <StarIcon key={index} color="yellow" fill="yellow" />
                      ),
                    )}
                  </div>
                </div>
                <div>{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </Fieldset>
    </Stack>
  );
}
