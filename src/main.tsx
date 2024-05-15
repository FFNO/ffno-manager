import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';

import { Drawer, MantineProvider, Select, createTheme } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import OneSignal from 'react-onesignal';
import App from './App.tsx';
import { queryClient } from './api';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

OneSignal.init({
  appId: '3726fbcb-b3ab-465c-92a8-ab724a24f027',
  allowLocalhostAsSecureOrigin: true,
});

const theme = createTheme({
  fontFamily: 'Inter',
  fontFamilyMonospace: 'JetBrains Mono',
  primaryColor: 'indigo',
  components: {
    Select: Select.extend({
      defaultProps: {
        checkIconPosition: 'right',
      },
    }),
    Drawer: Drawer.extend({
      defaultProps: {
        position: 'right',
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <NextUIProvider>
        <DatesProvider settings={{}}>
          <ModalsProvider
            modalProps={{ centered: true }}
            labels={{ confirm: 'Confirm', cancel: 'Cancel' }}
          >
            <Notifications position="bottom-right" />
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ModalsProvider>
        </DatesProvider>
      </NextUIProvider>
    </MantineProvider>
  </React.StrictMode>,
);
