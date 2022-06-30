//import { /*createElement,*/ useEffect, useState } from 'react';
//import { timePassed } from "../utils/utils";

//import { all } from "../../../backend/app";


/*fetch('http://localhost:3001/api/posts')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
        console.log(res.json.data)
    })*/



    const user = fetch(
        `http://localhost:3001/api/auth`
        ).then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        
    const post = fetch(
        `http://localhost:3001/api/posts`
        ).then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
            
    const comment = fetch(
        `http://localhost:3001/api/comment`
        ).then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
                
                // do fetch requests in parallel
                // using the Promise.all() method
                const allData = Promise.all([user, post, comment]);
                
                // attach then() handler to the allData Promise
                allData.then((res) => console.log(res));
                
                
                const Posts = () => {
                /*const [Posts, setPosts] = useState([])
    
        useEffect(() => {
          const fetchData = async () => {
            const result = await fetch('http://localhost:3001/api/posts')
            const jsonResult = await result.json();
            
            setPosts(jsonResult)
            console.log(jsonResult)
          }
    
          fetchData();
        }, [])*/
    
    
        //const allPosts = document.createElement('div')
        //for (let data of allData) {
            //allPosts.appendChild (
                return(
                    /*document.querySelector('#post').innerHTML +=
                `*/
                <article className='post'>
                      <div className='postBody'>
                            <div className='posterImg'><img src='{user.imageUrl}' alt='profile pic'/></div>
                            <div className='postInfos'>
                                <div className='postUser'>
                                    {user.firstName} + ' ' + {user.lastName}
                                </div>
                                <div className='postDate'>
                                    10 juin 2022, 15:04
                                </div>
                            </div>
                            <div className='postContent'>
                                <p>{post.content}</p>
                            </div>
                            <div className='postBottom'>
                                <div className='postLikes'>
                                    {post.usersLiked}
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
                                                <p>{comment.content}</p>
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
                </article>//`
            );
    
    
    
           /*return(
                document.querySelector('#post').innerHTML +=
            `<div className='postBody'>
                        <div className='posterImg'><img src='${post._id.imageUrl}' alt='profile pic'/></div>
                        <div className='postInfos'>
                            <div className='postUser'>
                                ${post._id.firstName}${post._id.lastName}
                            </div>
                            <div className='postDate'>
                                ${timePassed()}
                            </div>
                        </div>
                        <div className='postContent'>
                            <p>${post.content}</p>
                        </div>
                        <div className='postBottom'>
                            <div className='postLikes'>
                                5 likes
                            </div>
                            <div className='writeComment'>
                                Ecrire un commentaire
                            </div>
                        </div>
                            <div className='postComments'>
                                <div className='commentBloc'>
                                    <div className='userImg'><img src='${post._id.imageUrl}' alt='profile pic'/></div>
                                    <div className='commentCorpse'>
                                        <div className='commentUser'>
                                            ${post._id.firstName}${post._id.lastName}
                                        </div>
                                        <div className='commentContent'>
                                            <p>${post.content}</p>
                                        </div>
                                        <div className='commentDate'>
                                            ${timePassed()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                  </div>`)*/
        }
    
        //return(allPosts)
    
        /*return (
            <article className='post'>
                  <div className='postBody'>
                        <div className='posterImg'><img src='https://zupimages.net/up/22/23/hrn8.png' alt='profile pic'/></div>
                        <div className='postInfos'>
                            <div className='postUser'>
                                Pierre Michel
                            </div>
                            <div className='postDate'>
                                10 juin 2022, 15:04
                            </div>
                        </div>
                        <div className='postContent'>
                            <p>Amet officia nulla voluptate consectetur nulla ut. Deserunt reprehenderit laborum consectetur Lorem mollit aliquip aliqua consectetur officia adipisicing id ipsum labore deserunt. Qui incididunt adipisicing commodo nisi ea minim ipsum occaecat. Ullamco magna cillum ipsum irure non amet aliquip. In anim qui aliquip ullamco et ullamco reprehenderit officia sint elit proident ex qui. Veniam reprehenderit exercitation nostrud aliquip officia elit cillum. Et consequat incididunt ullamco nostrud eiusmod adipisicing laboris fugiat sit elit dolor sint sint.</p>
    <br />
    <p>Amet nisi officia sit excepteur occaecat magna sint. Esse aliquip qui cupidatat dolor dolor fugiat quis culpa non. Consequat aute velit fugiat eu enim cupidatat tempor voluptate magna id. Consequat cupidatat ullamco cupidatat culpa aliqua consequat sit tempor incididunt do aliquip ullamco velit. Et elit laborum pariatur id elit irure fugiat ipsum occaecat. In laboris nostrud adipisicing nisi. Ullamco nulla ut duis duis.</p>
                        </div>
                        <div className='postBottom'>
                            <div className='postLikes'>
                                5 likes
                            </div>
                            <div className='writeComment'>
                                Ecrire un commentaire
                            </div>
                        </div>
                            <div className='postComments'>
                                <div className='commentBloc'>
                                    <div className='userImg'><img src='https://zupimages.net/up/20/52/sf2z.png' alt='profile pic'/></div>
                                    <div className='commentCorpse'>
                                        <div className='commentUser'>
                                            James Durand
                                        </div>
                                        <div className='commentContent'>
                                            <p>C'est super drôle ce truc haha !</p>
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
        );*/
    //}
    export default Posts;