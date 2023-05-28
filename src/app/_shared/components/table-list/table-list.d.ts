import {PipeTransform} from '@angular/core';

export interface PipeConfig {
    pipe: PipeTransform;
    args: any;
}

export interface TableColumnConfig {
    columnTitle: string;
    fallbackValue?: string;
    filterOperator?: 'is' | 'is_not' | 'like' | 'from' | 'to';
    pipes?: PipeConfig[];
    propertyName?: string;
    propertyPath: string;
    sortable: boolean;
}

export interface TableConfig {
    columns: TableColumnConfig[];
    searchOptions?: {
        value: string,
        text: string,
    }[];
    sortProperty?: string;
}

export interface ListResponse {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string;
    path: string;
    per_page: string;
    prev_page_url: string;
    to: number;
    total: number;
}
