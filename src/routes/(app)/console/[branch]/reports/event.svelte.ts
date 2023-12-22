import { get } from 'svelte/store';

import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { ReportService } from '$lib/services/report';
import { defaultForm, defaultTo } from '$lib/utils/generate';

const reportAPI = ReportService.getInstance();

export const handle = {
  action: (e: CustomEvent) => {
    const type = e.detail?.type || 'transactions';
    const { source } = e.detail;

    const params = new URLSearchParams(get(page).url.searchParams);
    params.set('id', source.id);

    goto(`/console/${get(page).params.branch}/reports/${type}?${params.toString()}`);
  },
};

export const call = {
  summary: async (branchID: number, query: URLSearchParams) => {
    if (branchID > 0) query.set('branch_id', branchID.toString());
    if (!query.has('from')) query.set('from', defaultForm.toISOString());
    if (!query.has('to')) query.set('to', defaultTo.toISOString());

    return await reportAPI.summary(query.toString());
  },
};
