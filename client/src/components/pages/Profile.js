import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

//import { getMe, deleteBook } from '../utils/API';
import { QUERY_ME } from '../utils/queries';
import { DELETE_NEWS } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeNewsId } from '../utils/localStorage';

const Profile = () => {

    const [userData, setUserData] = useState({});
    const {loading, data} = useQuery(QUERY_ME);
    console.log(data);

    useEffect(() => {
        if (data) {
            setUserData(data.me);
        }
    }, [data]);

    return (
        <>


            <div className="container mt-5">
                {/* <style scoped>
                    @import './profile.css';
                </style> */}

                <div className="row d-flex justify-content-center">

                    <div className="col-md-7">

                        <div className="card p-3 py-4">

                            <div className="text-center">
                                <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" className="rounded-circle" />
                            </div>

                            <div className="text-center mt-3">
                                <span className="bg-secondary p-1 px-4 rounded text-white">Free User</span>
                                <h5 className="mt-2 mb-0">{userData.username}</h5>
                                <span>UI/UX Designer</span>

                                <div className="px-4 mt-1">
                                    <p className="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>

                                </div>

                                <div className="d-flex justify-content-center">

                                    <a className="link-dark p-2" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter" /></svg></a>
                                    <a className="link-dark p-2" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram" /></svg></a>
                                    <a className="link-dark p-2" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook" /></svg></a>

                                </div>

                                <div className="buttons p-3">

                                    <button className="btn btn-outline-secondary px-4">Message</button>
                                    <button className="btn btn-outline-secondary px-4 ms-3">Contact</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="container col-md-10 d-flex justify-content-center border-bottom">
                <hr />
            </div>
        </>

    );

};

export default Profile;