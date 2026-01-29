import { inject } from '@angular/core';
import { ContentDto } from '@libs/dto';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { ContentApiService } from '../api/content-api.service';

export interface ContentState {
  loading: boolean;
  error: string | null;
  data: ContentDto | null;
}

export const ContentStore = signalStore(
  withState<ContentState>({
    loading: false,
    error: null,
    data: null,
  }),
  withMethods((store) => {
    const contentApiService = inject(ContentApiService);

    return {
      load(path: string) {
        patchState(store, { loading: true, error: null });
        contentApiService.getContent(path).subscribe({
          next: (data) => {
            patchState(store, { data, loading: false });
          },
          error: (error) => {
            patchState(store, { error: error.message, loading: false });
          },
        });
      },
    };
  }),
);
