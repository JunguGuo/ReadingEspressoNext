import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { ReadsTable } from '@/components/dashboard/read/reads-table';
import type { Read } from '@/components/dashboard/read/reads-table';

export const metadata = { title: `Reads | Dashboard | ${config.site.name}` } satisfies Metadata;

// const reads = [
//   {
//     id: '01',
//     title: 'USR-010',
//     author: 'Alcides Antonio',
//     content: '/assets/avatar-10.png',
//     createdAt: dayjs('2022-01-01T12:00:00').toDate(),
//   },
// ] satisfies Read[];

// Utility function to transform fetched data
const transformToRead = (data: any[]): Read[] => {
  return data.map((item) => ({
    id: item._id,
    title: item.title,
    author: item.author,
    content: item.content,
    createdAt: new Date(item.createdAt),
  }));
};

export default async function Page(): React.JSX.Element {
  const response = await fetch('http://127.0.0.1:3001/api/v1/reads');
  const data = await response.json();
  const reads = transformToRead(data.data.reads) satisfies Read[];
  console.log(reads);

  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(reads, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Reads</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      <ReadsTable count={paginatedCustomers.length} page={page} rows={paginatedCustomers} rowsPerPage={rowsPerPage} />
    </Stack>
  );
}

function applyPagination(rows: Read[], page: number, rowsPerPage: number): Read[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
