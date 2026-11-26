import React, { useContext, useEffect, useState } from 'react'
import "./post.css"
import { Link } from "react-router-dom"
import { Context } from '../../context/Context'
import axios from 'axios'

const Post = ({ post, getsavedata }) => {
    // const PF = "https://eventsandnewsapi.onrender.com/images/"
    const { user } = useContext(Context)
    const [likeloading, setLikeLoading] = useState(false);
    const [saveloading, setSaveLoading] = useState(false);
    const [likes, setLikes] = useState([]);
    const [saves, setSaves] = useState([]);
    const likeStatus = user ? likes.includes(user._id) : false;
    const saveStatus = user ? saves.includes(post._id) : false;
    const processLinks = (html) => {
        return html.replace(/href="(?!https?:\/\/)([^"]*)"/g, 'href="https://$1"');
    };
    const safeHtmlContent = processLinks(post.desc);

    useEffect(() => {
        const getlike = async () => {
            try {
                setLikes(post.likes || []);
            } catch (error) {
                console.log(error)
            }
        }
        getlike();
    }, [post])

    useEffect(() => {
        const getSavedposts = async () => {
            try {
                setSaves(getsavedata || []);
            } catch (error) {
                console.log(error)
            }
        }
        getSavedposts();
    }, [user, getsavedata])

    const handleLikeStatus = async () => {
        if (likeloading || !user) return;
        setLikeLoading(true);
        try {
            await axios.put(`https://events-and-news-web-backend.vercel.app/api/post/like/${post._id}`, {
                _id: user._id
            });
            setLikes((prev) =>
                likeStatus ? prev.filter((id) => id !== user._id) : [...prev, user._id]
            );
            setLikeLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLikeLoading(false);
        }
    }

    const handleSaveStatus = async () => {
        if (saveloading || !user) return;
        setSaveLoading(true);
        try {
            await axios.put(`https://events-and-news-web-backend.vercel.app/api/post/save/${post._id}`, {
                _id: user._id
            });
            setSaves((prev) =>
                saveStatus ? prev.filter((id) => id !== post._id) : [...prev, post._id]
            );
            setSaveLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setSaveLoading(false);
        }
    }
    return (
        <div className='post'>
            {post.photo && (
                <Link to={`/post/${post._id}`} className='link'><img className='postImg' src={post.photo} alt="" /></Link>
            )}
            {user && (
                <>
                    <div className='like' onClick={handleLikeStatus}>
                        {likeloading ? "..." : `${likeStatus ? '❤️' : '🤍'} ${likes.length}`}
                    </div>
                    <div className='like' onClick={handleSaveStatus}>
                        {saveloading ? "..." : `${saveStatus ? '⛊' : '⛉'}`}
                    </div>
                </>
            )}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className='link'>
                    <span className="postTitle">
                        {post.title}
                    </span>
                </Link>
                <hr />
                <span className='postDate'>Posted On : {new Date(post.createdAt).toDateString()}</span>
            </div>

            {/* <p className='postDesc'>{post.desc}</p> */}
            <p className='postDesc' dangerouslySetInnerHTML={{ __html: safeHtmlContent }} />
        </div>
    )
}

export default Post
