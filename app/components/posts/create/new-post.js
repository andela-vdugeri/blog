'use strict';

import PostService from '../post.service';
import ImageHandler from '../../utils/image.handler';

export default {
  data() {
    return {
      post: {},
      editorOption: {
        placeholder: 'Tell us something new',
        theme: 'snow',
        size: 5,
        imageHandler: ImageHandler,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ],
        },
      },
      errors: [],
    };
  },

  methods: {
    publish() {
      console.log(this.post);
      PostService.publish(this.post).then(res => {
        const post = res.data;
        this.$router.push(`/posts/${post.id}`);
      }).catch(error => {
        this.errors.push({ message: error.message });
      });
    },

    save() {
      const post = {
        body: this.content,
      };
      
      PostService.save(post).then(post => {
        console.log(post);
      }).catch(error => {
        this.errors.push({ message: error.message });
      });
    },

  }
};
