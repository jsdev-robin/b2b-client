import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Channel = 'redux' | 'general';

export interface Message {
  id: number;
  channel: Channel;
  userName: string;
  text: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    getMessages: build.query<Message[], Channel>({
      query: (channel) => `messages/${channel}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const ws = new WebSocket('ws://localhost:8080');
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            console.log(data);

            updateCachedData((draft) => {
              draft.push(data);
            });
          };

          ws.addEventListener('message', listener);
        } catch {}
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
  }),
});

export const { useGetMessagesQuery } = api;
