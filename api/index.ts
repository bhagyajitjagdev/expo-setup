import { type AxiosError } from 'axios';

import { type ApiEndpoints } from './endpoints';
import instance from './instance';

import { StorageKeys, type IRes } from '~/types/shared.types';
import { extractErrorMsg } from '~/utils/function/api.utils';

interface IGetAxios {
  endpoint: ApiEndpoints;
  id?: string;
  params?: any;
}

interface IPostAxios<BT> {
  endpoint: ApiEndpoints;
  id?: string;
  body: BT;
}

interface IPutAxios<BT> {
  endpoint: ApiEndpoints;
  id?: string;
  body: BT;
}

export async function getAxios<T>({ endpoint, id, params }: IGetAxios) {
  try {
    const token = StorageKeys.MILAPP_TOKEN;
    const fullEndpoint = id ? `${endpoint}/${id}` : endpoint;

    const response = await instance.get<IRes<T>>(fullEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data;
  } catch (e) {
    const error = e as AxiosError<IRes<T & { message?: string }>>;
    // openNotification({
    //   type: 'error',
    //   message: extractErrorMsg(error),
    // });
  }
}

export async function postAxios<RT, BT>({ endpoint, id, body }: IPostAxios<BT>) {
  try {
    const token = StorageKeys.MILAPP_TOKEN;
    const fullEndpoint = id ? `${endpoint}/${id}` : endpoint;
    const response = await instance.post<IRes<RT>>(fullEndpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    const error = e as AxiosError<IRes<RT & { message?: string }>>;
    const message = extractErrorMsg(error);

    let description = '';
    if (message === 'Bad Request Exception') {
      description = 'Please check the input fields and try again';
    }

    // openNotification({
    //   type: 'error',
    //   message,
    //   description,
    // });
  }
}

export async function putAxios<RT, BT>({ endpoint, id, body }: IPutAxios<BT>) {
  try {
    const token = StorageKeys.MILAPP_TOKEN;
    const fullEndpoint = id ? `${endpoint}/${id}` : endpoint;
    const response = await instance.put<IRes<RT>>(fullEndpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    const error = e as AxiosError<IRes<RT & { message?: string }>>;

    // openNotification({
    //   type: 'error',
    //   message:
    //     error.response?.data?.message ||
    //     error.response?.data?.result?.message ||
    //     error.message ||
    //     'Something Went Wrong',
    // });
  }
}
