import ChatSidebar from '@/components/chat/ChatSidebar';
import { socketService } from '@/services/socket';
import { currentMemberAtom } from '@/app';
import { Divider, Group } from '@mantine/core';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

export const Route = createFileRoute('/chat')({
  component: ChatLayout,
});

function ChatLayout() {
  const member = useAtomValue(currentMemberAtom);

  useEffect(() => {
    socketService.connect();
    return () => socketService.disconnect();
  }, [member.id]);

  return (
    <Group>
      <ChatSidebar />
      <Divider orientation="vertical" />
      <Outlet />
    </Group>
  );
}
