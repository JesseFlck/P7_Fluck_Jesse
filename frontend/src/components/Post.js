const userData = localStorage.getItem('userData')
const parseToken = JSON.parse(userData)

const init = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': parseToken.token
    }
}
    
    
const post = fetch(
   `http://localhost:3001/api/posts`, init
    ).then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }
    ).then(function(dataPosts) {
        for (let data of dataPosts) {
            const user = fetch(
                `http://localhost:3001/api/auth/user/${data.userId}`, init
                ).then(function (res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(dataUsers) {
                    Posts(data, dataUsers)
                })
                const comment = fetch(
                    `http://localhost:3001/api/comment/${data._id}`, init
                    ).then(function (res) {
                        if (res.ok) {
                            return res.json();
                        }
                    }).then(function(dataCommentsUsers) {
                        for (let dataUser of dataCommentsUsers) {
                            console.log(dataUser)
                            const userComment = fetch(
                                `http://localhost:3001/api/auth/user/${dataUser.UserId}`, init
                                ).then(function (res) {
                                    if (res.ok) {
                                        return res.json();
                                    }
                                }).then(function (commentUserId){
                                    Posts(data, commentUserId)
                                })
                            }
                    })
        }
    })
            
                
                
    const Posts = (post, user, comment) => {
        //console.log(post)
        //console.log(user)
        //console.log(comment)
        return(
            <article className='post'>
                <div className='postBody'>
                    <div className='posterImg'><img src='{user.imageUrl}' alt='profile pic'/></div>
                    <div className='postInfos'>
                        <div className='postUser'>
                            {user.firstName} {user.lastName}
                        </div>
                        <div className='postDate'>
                            10 juin 2022, 15:04
                        </div>
                    </div>
                    <div className='postTitle'>
                        <h2>{post.title}</h2>
                    </div>
                    <div className='postContent'>
                        <p>{post.content}</p>
                    </div>
                    <div className='postBottom'>
                        <div className='postLikes'>
                            3likes
                        </div>
                        <div className='writeComment'>
                            Ecrire un commentaire
                        </div>
                    </div>
                        <div className='postComments'>
                            <div className="newComment">
                                <label><input type="text" name="content" placeholder="Ecrire un commentaire"/></label>
                                <input type="submit" value="Envoyer" className='boutoncomm'/>
                            </div>
                            <div className='commentBloc'>
                                <div className='userImg'><img src='https://zupimages.net/up/20/52/sf2z.png' alt='profile pic'/></div>
                                <div className='commentCorpse'>
                                    <div className='commentUser'>
                                        James Durand
                                    </div>
                                    <div className='commentContent'>
                                        <p>un truc</p>
                                    </div>
                                    <div className='commentDate'>
                                        10 juin 2022, 15:12
                                    </div>
                                </div>
                            </div>
                            <div className='commentBloc'>
                                <div className='userImg'><img src='https://zupimages.net/up/21/52/cvpi.png' alt='profile pic'/></div>
                                <div className='commentCorpse'>
                                    <div className='commentUser'>
                                        Louis Conrad
                                    </div>
                                    <div className='commentContent'>
                                        <p>Ah je l'avais déjà vu, ça me fait toujours autant rire !</p>
                                    </div>
                                    <div className='commentDate'>
                                        10 juin 2022, 15:15
                                    </div>
                                </div>
                            </div>
                            <div className='commentBloc'>
                                <div className='userImg'><img src='https://zupimages.net/up/21/16/6f9o.png' alt='profile pic'/></div>
                                <div className='commentCorpse'>
                                    <div className='commentUser'>
                                        Ginette Beauchamp
                                    </div>
                                    <div className='commentContent'>
                                        <p>Amet officia nulla voluptate consectetur nulla ut. Deserunt reprehenderit laborum consectetur Lorem mollit aliquip aliqua consectetur officia adipisicing id ipsum labore deserunt. Qui incididunt adipisicing commodo nisi ea minim ipsum occaecat. Ullamco magna cillum ipsum irure non amet aliquip. In anim qui aliquip ullamco et ullamco reprehenderit officia sint elit proident ex qui. Veniam reprehenderit exercitation nostrud aliquip officia elit cillum. Et consequat incididunt ullamco nostrud eiusmod adipisicing laboris fugiat sit elit dolor sint sint.</p>
                                        <br />
                                        <p>Amet nisi officia sit excepteur occaecat magna sint. Esse aliquip qui cupidatat dolor dolor fugiat quis culpa non. Consequat aute velit fugiat eu enim cupidatat tempor voluptate magna id. Consequat cupidatat ullamco cupidatat culpa aliqua consequat sit tempor incididunt do aliquip ullamco velit. Et elit laborum pariatur id elit irure fugiat ipsum occaecat. In laboris nostrud adipisicing nisi. Ullamco nulla ut duis duis.</p>
                                    </div>
                                    <div className='commentDate'>
                                        10 juin 2022, 15:12
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>          
            </article>
        )
}
                
export default Posts;