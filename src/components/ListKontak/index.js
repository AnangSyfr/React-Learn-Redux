import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteKontak, detailKontak, getListKontak } from '../../actions/kontakAction';

const ListKontak = () => {
    const { getListKontakResult, getListKontakLoading, getListKontakError, deleteListKontakResult } = useSelector((state) => state.kontakReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        //panggil action getListKontak
        dispatch(getListKontak());

    },[dispatch]);

    useEffect(() => {
        if(deleteListKontakResult){
            dispatch(getListKontak());
        }
    },[deleteListKontakResult, dispatch])

    return (
        <div>
            <h4>List Kontak</h4>
            { 
                getListKontakResult ? (
                    getListKontakResult.map((kontak) => {
                        return (
                            <p key={kontak.id}>
                                {kontak.nama} - {kontak.nomor} |
                                <button onClick={ () => dispatch(deleteKontak(kontak.id)) }>Delete</button>
                                <button onClick={ () => dispatch(detailKontak(kontak))} style={{marginLeft:"20px"}}>Edit</button>
                            </p>
                        )
                    })
                )
            :
                getListKontakLoading ? (
                    <p>Loading...</p>
                )
            : (
                <p>{getListKontakError ? getListKontakError : "Data Kosong"}</p>
            )
            }
        </div>
    )
}

export default ListKontak