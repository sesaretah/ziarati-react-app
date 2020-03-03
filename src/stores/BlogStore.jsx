import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class BlogStore extends EventEmitter {
  constructor() {
    super()
    this.blogs = [];
  }

  showBlogs(blogs){
    this.blogs = [];
    for (var i = 0, len = blogs.length; i < len; ++i) {
      this.blogs.push(blogs[i]);
    }
    this.emit("show_blogs");
  }

  showBlog(data){
    this.blogs = [];
    this.blogs.push(data);
    this.emit("show_blog");
  }


  getAll() {
    return this.blogs
  }

  handleActions(action) {
    switch(action.type) {
      case "SHOW_BLOGS": {
        this.showBlogs(action.blogs);
        break;
      }
      case "SHOW_BLOG": {
        this.showBlog(action.blog);
        break;
      }
    }
  }
}


const blogStore = new BlogStore;
dispatcher.register(blogStore.handleActions.bind(blogStore));

export default blogStore;
