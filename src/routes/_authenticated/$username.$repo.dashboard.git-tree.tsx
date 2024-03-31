import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/$username/$repo/dashboard/git-tree')({
  component: () => <div>Hello /$username/$repo/dashboard/git-tree!</div>,
});
