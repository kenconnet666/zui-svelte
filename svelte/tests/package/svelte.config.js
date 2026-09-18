import node from '@sveltejs/adapter-node';
import staticAdapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: process.env.ZUI_PRERENDER
      ? staticAdapter({ pages: 'prerender', assets: 'prerender', strict: false })
      : node({ out: 'dist' }),
    prerender: { entries: ['/static'] },
  },
};
