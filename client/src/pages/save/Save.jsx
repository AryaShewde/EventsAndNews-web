// import React, { useContext } from 'react'
import { useContext, useEffect, useState } from "react"
// import Footer from "../../components/footer/Footer"
import Loading from "../loading/Loading"
import "./save.css"
import axios from "axios"
import { Context } from "../../context/Context"
import Saveposts from "../../components/saveposts/Saveposts"
// import { Link } from 'react-router-dom'
// import { Context } from '../../context/Context'

const Save = () => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [getsavedata, setGetsavedata] = useState([]);
    // const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            if (user) {
                const res2 = await axios.get("https://events-and-news-web-backend.vercel.app/api/posts/savedposts/" + user._id);
                setGetsavedata(res2.data || []);
                setVisiblePosts(res2.data || []);
            }
            setLoading(false);
        }
        fetchPosts()
    }, [user])
    return (
        <>
            <div className='home'>
                {loading ? (
                    <Loading />
                ) : (
                    <div className='allposts'>
                        <Saveposts posts={visiblePosts} getsavedata={getsavedata} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Save
