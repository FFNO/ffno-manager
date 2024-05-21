import { contactRecordAtom, currentMemberAtom } from '@/app';
import { DATE_FORMAT, IMessageResDto } from '@/libs';
import { Avatar, Tooltip, cn } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

interface Props extends IMessageResDto {}

export const ChatMessage = (props: Props) => {
  const currentMember = useAtomValue(currentMemberAtom);
  const contactRecord = useAtomValue(contactRecordAtom);

  const isMyself = useMemo(
    () => currentMember.id === props.senderId,
    [currentMember.id, props.senderId],
  );
  return (
    <div className={cn('px-2 flex flex-col', isMyself && 'items-end')}>
      <div className="flex gap-2 items-center">
        {!isMyself && (
          <Tooltip content={contactRecord[props.senderId]?.name}>
            <Avatar src={contactRecord[props.senderId]?.imgUrl} />
          </Tooltip>
        )}
        <Tooltip
          placement="bottom"
          content={dayjs(props.createdAt).format(DATE_FORMAT)}
        >
          <div
            className={cn(
              'px-3 py-2 rounded-lg ',
              isMyself
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary-100',
            )}
          >
            {props.content}
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
