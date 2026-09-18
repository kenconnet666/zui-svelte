import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => ({
  scheme: cookies.get('probe-theme') === 'dark' ? 'dark' : 'light',
});

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const scheme = (await request.formData()).get('scheme');
    cookies.set('probe-theme', scheme === 'dark' ? 'dark' : 'light', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });
    return { saved: true };
  },
};
