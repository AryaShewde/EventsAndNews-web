import "./settings.css"
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Context } from "../../context/Context"
import avatar from "../../avatar/avatar.jpg"



const Settings = () => {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [profilepicstate, setProfilepicstate] = useState(true);
    const [success, setSuccess] = useState(false);
    const [bio, setBio] = useState(user?.bio || "");
    const [Instagram, setInstagram] = useState(user?.Instagram || "");
    const [Twitter, setTwitter] = useState(user?.Twitter || "");
    const [LinkedIn, setLinkedIn] = useState(user?.LinkedIn || "");
    const [Facebook, setFacebook] = useState(user?.Facebook || "");

    // const PF = "https://eventsandnewsapi.onrender.com/images/"
    const handleCancle = ()=>{
        window.location.replace("/");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
            bio,
            Instagram,
            Twitter,
            LinkedIn,
            Facebook
        };
        if (file) {
            const data = new FormData();
            // const filename = Date.now() + file.name;
            // data.append("name", filename);
            data.append("file", file);
            data.append("userId", user._id);
            // updatedUser.profilePic = filename;
            try {
                await axios.put("https://events-and-news-web-backend.vercel.app/api/uploading/" + user._id, data);
            } catch (error) { }
        }
        try {
            const res = await axios.put('https://events-and-news-web-backend.vercel.app/api/users/' + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
            window.location.replace("/");
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" })
        }

    }
    const handleUrlSubmit = () => {
        setProfilepicstate(!profilepicstate)
    }

    return (
        <>
            <div className="settings">
                <div className="settingsWrapper">
                    <div className="settingsTitle">
                        <span className="settingsUpdateTitle">Update your Account</span>
                        <span className="settingsDeleteTitle">Delete Account</span>
                    </div>
                    <form className="settingsForm" onSubmit={handleSubmit}>
                        <label>Profile Picture</label>
                        {profilepicstate ?
                            <div className="settingsPP">
                                <img src={file ? URL.createObjectURL(file) : user?.profilePic || avatar} alt="" />
                                <label htmlFor="fileInput">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="settingsPPIcon bi bi-person-circle">
                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                            <path d="M6.5 8a2 2 0 1 0 4 0a2 2 0 0 0-4 0m14.427 1.99c-6.61-.908-12.31 4-11.927 10.51" />
                                            <path d="M3 13.066c2.78-.385 5.275.958 6.624 3.1" />
                                            <path d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z" /></g>
                                    </svg>
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: "none" }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                    name="imgfile"
                                />
                            </div>
                            :
                            <input placeholder="Paste an Image URL" type="text" onChange={e => setFile(e.target.value)} required name="imageURL" />
                        }
                        <button type="button" className="imgurl" onClick={handleUrlSubmit}>{profilepicstate ? "Provide Image URL" : "Upload a Custom Photo"}</button>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder={user.username}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            name="username"
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder={user.email}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            name="email"
                        />
                        <label>Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} required name="password" />
                        <label>Bio</label>
                        <input type="textarea" placeholder="Enter your Bio" value={bio} onChange={e => setBio(e.target.value)} name="Bio" />
                        <label>Instagram</label>
                        <input type="textarea" placeholder="Enter your Instagram" value={Instagram} onChange={e => setInstagram(e.target.value)} name="Instagram" />
                        <label>Twitter</label>
                        <input type="textarea" placeholder="Enter your Twitter" value={Twitter} onChange={e => setTwitter(e.target.value)} name="Twitter" />
                        <label>LinkedIn</label>
                        <input type="textarea" placeholder="Enter your LinkedIn" value={LinkedIn} onChange={e => setLinkedIn(e.target.value)} name="LinkedIn" />
                        <label>Facebook</label>
                        <input type="textarea" placeholder="Enter your Facebook" value={Facebook} onChange={e => setFacebook(e.target.value)} name="Facebook" />
                        <button className="settingsSubmit" type="submit">Update</button>
                        <button className="settingsCancle" type="button" onClick={handleCancle}>Cancle</button>
                        {success && <span style={{ color: "green", marginTop: "20px", display: "flex", alignSelf: "center" }}>Profile has been updated...</span>}
                    </form>
                </div>
                {/* <Sidebar /> */}
            </div>
        </>
    )
}

export default Settings
