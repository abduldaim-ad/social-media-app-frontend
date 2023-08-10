import React, { useEffect, useState } from 'react'
import './styles/Profile.css'
import CustomCard from './CustomCard'
import axios from 'axios'
import CustomModal from '../common/CustomModal';
import { FetchData } from '../../config/functions';

import useAuth from '../../hooks/useAuth';

const Profile = () => {

    const [myPosts, setMyPosts] = useState([{}])

    const [modalTitle, setModalTitle] = useState("")
    const [modalDesc, setModalDesc] = useState("")

    const [openModal, setOpenModal] = useState(false);

    const token = localStorage.getItem("userToken");
    const user = JSON.parse(localStorage.getItem("userData"));

    const { _id } = user;
    const userId = _id;

    // const { user } = useAuth();

    // console.log("UserTest", user)

    const handleGetUserPost = async () => {
        const url = 'http://localhost:5000/getuserposts';
        const response = await FetchData(url, token, 'GET', null);
        if (response && response.data) {
            setMyPosts(response.data)
        }
    }

    useEffect(() => {
        handleGetUserPost();
    }, [])

    const handleOpenModal = (title, desc) => {
        setModalTitle(title)
        setModalDesc(desc)
        setOpenModal(true)
    }

    return (
        <>
            <div className='cover-div'>
                <div className='profile-div'>

                </div>
            </div>
            <h1 className='recent-heading'>Recent Posts</h1>
            <div className='card-div'>
                {
                    myPosts.toReversed().map((myPost) => {
                        const { _id, title, desc } = myPost
                        return (
                            <CustomCard userId={userId} postId={_id} title={title} desc={desc} handleGetUserPost={handleGetUserPost} />
                        )
                    })
                }
            </div>
            <CustomModal openModal={openModal} setOpenModal={setOpenModal} modalTitle={modalTitle} modalDesc={modalDesc} />
        </>
    )
}

export default Profile