import {
  Badge,
  Box,
  Collapse,
  Group,
  ThemeIcon,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { Link, useRouter } from '@tanstack/react-router';
import { ArrowRight01Icon } from 'hugeicons-react';
import { useState } from 'react';
import classes from './LinksGroup.module.css';

interface LinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { label: string; link: string; badge?: number }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: LinksGroupProps) {
  const router = useRouter();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link className={classes.link} to={link.link} key={link.label}>
      {link.label}
      {link.badge && <Badge color="red">{link.badge}</Badge>}
    </Link>
  ));

  return (
    <>
      <UnstyledButton
        onClick={
          link ? () => router.history.push(link) : () => setOpened((o) => !o)
        }
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ArrowRight01Icon
              className={classes.chevron}
              strokeWidth={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
