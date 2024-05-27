import { Button, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Search01Icon } from 'hugeicons-react';
import { PropsWithChildren } from 'react';

export const SearchButton = ({ children }: PropsWithChildren) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        variant="outline"
        leftSection={<Search01Icon size={20} />}
        onClick={open}
      >
        Search
      </Button>

      <Drawer opened={opened} onClose={close} title="Search">
        {children}
      </Drawer>
    </>
  );
};
