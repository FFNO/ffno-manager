import { useList } from '@/api';
import { IChannelDto } from '@/libs';
import { channelRecordAtom } from '@/states/chat';
import {
  Accordion,
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { Badge, Button } from '@nextui-org/react';
import { useNavigate } from '@tanstack/react-router';
import { AddSquareIcon, FilterIcon } from 'hugeicons-react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

function ChatSidebar() {
  const navigate = useNavigate();
  const { data } = useList<IChannelDto>({
    resource: 'chat/channels',
  });
  const [channelRecord, setChannelRecord] = useAtom(channelRecordAtom);

  useEffect(() => {
    if (data && !Object.keys(channelRecord).length) {
      const tempRecord: Record<string, IChannelDto> = {};

      data.data.forEach((channel) => {
        tempRecord[channel.id] = channel;
      });

      setChannelRecord(tempRecord);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Stack w={320} h={'100vh'} gap={0}>
      <Group px={16} py={14.5}>
        <Text fw={'bold'} fz={'xl'}>
          Chat
        </Text>
        <Box flex={1} />
        <ActionIcon variant="subtle">
          <FilterIcon size={16} />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <AddSquareIcon size={16} />
        </ActionIcon>
      </Group>
      <Divider py={2} />
      <Group>
        <Accordion w={'100%'} multiple defaultValue={['pinned']}>
          <Accordion.Item value={'pinned'}>
            <Accordion.Control>Pinned</Accordion.Control>
            <Accordion.Panel>
              {data?.data.map((channel) => (
                <Button
                  key={channel.id}
                  fullWidth
                  variant={'light'}
                  size="lg"
                  className="px-3 justify-start"
                  onClick={() =>
                    navigate({
                      to: '/chat/$channelId',
                      params: {
                        channelId: channel.id,
                      },
                    })
                  }
                >
                  <Badge
                    content=""
                    color="success"
                    shape="circle"
                    placement="bottom-right"
                  >
                    <Avatar size="sm" src={channel.imgUrl} />
                  </Badge>
                  <span className="text-sm flex-1 max-w-[160px] overflow-hidden">
                    <p className="text-start text-ellipsis">{channel.name}</p>
                  </span>
                </Button>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Group>
    </Stack>
  );
}

export default ChatSidebar;
