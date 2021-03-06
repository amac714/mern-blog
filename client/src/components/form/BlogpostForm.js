import React from 'react';

function BlogForm({ savePost, title, post, onChange }) {
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={savePost}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="title"
                type="text"
                value={title}
                className="validate"
                onChange={onChange}
              />
              <label htmlFor="title">Title</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="post"
                value={post}
                className="materialize-textarea"
                onChange={onChange}
              />
              <label htmlFor="textarea1">Blogpost</label>
            </div>
          </div>
          <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <button
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;
