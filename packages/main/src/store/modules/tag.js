/** *
 * Copyright (c) 2023 湖南数字侠软件有限公司
 * @author freedom.yi
 * @date 2023/11/22
 * @project vue-project
 *
 * */
import { defineStore } from 'pinia'

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: null,
    tagList: [],
    keepAliveList: [],
  }),
  getters: {},
  actions: {
    addTag(tag) {
      this.tags = tag;
      if (this.tagList.some((v) => v.path === tag.path)) {
        return;
      }

      if (!this.keepAliveList.includes(tag.path)) {
        this.keepAliveList.push(tag.path);
      }

      this.tagList.push({
        ...tag,
        component: null,
      });
    },
    delTag(tag) {
      for (const [i, v] of this.tagList.entries()) {
        if (v.path === tag.path) {
          this.tagList.splice(i, 1);
          this.keepAliveList.splice(i, 1);
          break
        }
      }
    },
  }
})
