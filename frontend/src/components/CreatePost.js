import React from 'react';

const CreatePost = () => {
    return (
        <body>
            <div className='postBody'>
                <form className='formpost'>
                    <label><input type="text" name="content" /></label>
                    <label>Image (jpg, png, jpeg, gif) :<input type="file" name="image" /></label>
                    <input type="submit" value="Envoyer" className='boutonform'/>
                </form>
            </div>
        </body>
    );
};

export default CreatePost;