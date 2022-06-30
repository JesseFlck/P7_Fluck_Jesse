import React from 'react';

const CreatePost = () => {
    return (
        <div>
            <div className='postBody'>
                <form className='formpost'>
                    <label><input type="text" name="content" placeholder="Ecrire un nouveau message"/></label>
                    <label>Image (jpg, png, jpeg, gif) :<input type="file" name="image" /></label>
                    <input type="submit" value="Envoyer" className='boutonform'/>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;